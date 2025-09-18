import studentModel from "../models/Student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import facultyModel from "../models/Faculty.model.js";
import driverModel from "../models/Driver.model.js";
import adminModel from "../models/Admin.model.js";

export async function registerStudent(req, res) {
  try {
    const {
      college,
      name,
      email,
      rollNo,
      password,
      branch,
      semester,
      studentType,
      programLevel,
      programName,
    } = req.body;

    // Validation
    if (
      !college ||
      !name ||
      !email ||
      !rollNo ||
      !password ||
      !branch ||
      !semester ||
      !studentType ||
      !programLevel ||
      !programName
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user by email or rollNo
    const isUserAlreadyExist = await studentModel.findOne({
      $or: [{ email }, { rollNo }]
    });
    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User with this email or roll number already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const student = await studentModel.create({
      college,
      name,
      email,
      rollNo,
      password: hashedPassword,
      branch,
      semester,
      studentType,
      programLevel,
      programName,
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: student._id,
        college: student.college,
        role: "Student", // helpful in authorization
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Response
    res.status(201).json({
      message: "Student registered successfully",
      student: {
        _id: student._id,
        email: student.email,
        name: student.name,
        college: student.college,
        rollNo: student.rollNo,
        branch: student.branch,
        semester: student.semester,
        studentType: student.studentType,
        programLevel: student.programLevel,
        programName: student.programName,
      },
    });

  } catch (error) {
    console.error("student registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}
export async function loginStudent(req, res) {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find student by email
    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: student._id, role: "Student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Success response
    res.status(200).json({
      message: "Student logged in successfully",
      student: {
        _id: student._id,
        email: student.email,
        name: student.name,
        college: student.college,
        rollNo: student.rollNo,
        branch: student.branch,
        semester: student.semester,
        studentType: student.studentType,
        programLevel: student.programLevel,
        programName: student.programName,
      },
    });

  } catch (error) {
    console.error("Student login error:", error.message);
    res.status(500).json({ message: "Server error in student login" });
  }
}
export async function registerFaculty(req,res)
{
  try {
    const {college,name,email,employeeId,password,department,designation,coursesHandled}=req.body;
    if(!college||!name||!email||!employeeId||!password||!department||!designation||!coursesHandled)
    {
      return res.status(400).json({message:"All fields are required"});
    }
    const isFacultyAlreadyExist=await facultyModel.findOne({$or: [{ email }, { employeeId }]});
    if(isFacultyAlreadyExist)
    {
      return res.status(400).json({message:"Account is already exists"})
    }
     const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const faculty = await facultyModel.create({
      college,
      name,
      email,
      password: hashedPassword,
      employeeId,
      department,
      designation,
      coursesHandled
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: faculty._id,
        college: faculty.college,
        role: "Faculty", // helpful in authorization
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Response
    res.status(201).json({
      message: "Faculty registered successfully",
      student: {
        _id: faculty._id,
        email: faculty.email,
        name: faculty.name,
        college: faculty.college,
        employeeId:faculty.employeeId,
        department:faculty.department,
        designation:faculty.designation,
        courseHandle:faculty.coursesHandled
      },
    });



  }
  catch (error)
  {
    console.log("faculty register error",error.message);
    res.status(500).json(
      {message:"Faculty registration server error"});
  }
 

}

export async function loginFaculty(req,res)
{
  try{
    const {email,password}=req.body;
    if(!email||!password)
    {
      return res.status(400).json({message:"All fields are required"});
    }
    const faculty= await facultyModel.findOne({email});
    if(!faculty)
    {
      return res.status(400).json({message:"Invalid Credentials"});
    }
    const isPasswordValid= await bcrypt.compare(password,faculty.password);
    if(!isPasswordValid)
    {
      return res.status(400).json({message:"Invalid Credentials"});
    }
     const token = jwt.sign(
      { id: faculty._id, role: "Faculty" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
     res.status(201).json({
      message: "Faculty registered successfully",
      student: {
        _id: faculty._id,
        email: faculty.email,
        name: faculty.name,
        college: faculty.college,
        employeeId:faculty.employeeId,
        department:faculty.department,
        designation:faculty.designation,
        courseHandle:faculty.coursesHandled
      },
    });


  }
  catch(error)
  {
    console.log("faculty login error",error.message);
    res.status(500).json({message:"Server error in faculty login"});

  }
}


export async function registerDriver(req, res) {
  try {
    const {
      college,
      name,
      email,
      driverId,
      password,
      licenseNumber,
      busNumber,
      route,
      contactNumber,
    } = req.body;

    if (!college || !name || !email || !driverId || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if driver already exists
    const isDriverAlreadyExist = await driverModel.findOne({
      $or: [{ email }, { driverId }, { licenseNumber }],
    });
    if (isDriverAlreadyExist) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create driver
    const driver = await driverModel.create({
      college,
      name,
      email,
      password: hashedPassword,
      driverId,
      licenseNumber,   
      busNumber,
      route,
      contactNumber,
    });

    // Generate JWT
    const token = jwt.sign(
      {
        id: driver._id,
        college: driver.college,
        role: "Driver",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Success response
    res.status(201).json({
      message: "Driver registered successfully",
      driver: {
        _id: driver._id,
        name: driver.name,
        email: driver.email,
        driverId: driver.driverId,
        licenseNumber: driver.licenseNumber,
        busNumber: driver.busNumber,
        route: driver.route,
        contactNumber: driver.contactNumber,
        college: driver.college,
      },
    });
  } catch (error) {
    console.error("Error in driver registration:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function loginDriver(req,res)
{
  try{
    const{email,password}=req.body;
    if(!email||!password)
    {
      return res.status(400).json({message:"All fields are required"});
    }
    const driver= await driverModel.findOne({email});
    if(!driver)
    {
      return res.status(400).json({message:"Invalid credentials"});
    }
    const isPasswordValid = await bcrypt.compare(password, driver.password);
    if(!isPasswordValid)
    {
      return res.status(400).json({message:"Invalid credentials"});
    }
    const token= jwt.sign({id:driver._id,role:"Driver"},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie("token",token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(201).json({
      message:"Driver login Successfully",
      driver:{
        _id: driver._id,
        name: driver.name,
        email: driver.email,
        driverId: driver.driverId,
        licenseNumber: driver.licenseNumber,
        busNumber: driver.busNumber,
        route: driver.route,
        contactNumber: driver.contactNumber,
        college: driver.college,
       }
    })

  }
  catch(error)
  {
    console.log("error in driver login",error.message);
    res.status(500).json({message:"server error in driver login"})
  }
}

// ---- Admin controllers added below ----
export async function registerAdmin(req, res) {
  try {
    const { college, name, email, employeeId, password, role, permissions } = req.body || {};

    // Basic validation
    if (!college || !name || !email || !employeeId || !password || !role) {
      return res.status(400).json({ message: "All required fields (college, name, email, employeeId, password, role) must be provided" });
    }

    // Validate role enum (optional but recommended)
    const allowedRoles = ["SuperAdmin", "ExamAdmin", "TransportAdmin", "AccountsAdmin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: `Invalid role. Allowed: ${allowedRoles.join(", ")}` });
    }

    // Check duplicates
    const existingAdmin = await adminModel.findOne({ $or: [{ email }, { employeeId }] });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email or employeeId already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await adminModel.create({
      college,
      name,
      email,
      employeeId,
      password: hashedPassword,
      role,
      permissions: Array.isArray(permissions) ? permissions : (permissions ? [permissions] : []),
    });

    const token = jwt.sign(
      { id: admin._id, college: admin.college, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        employeeId: admin.employeeId,
        role: admin.role,
        permissions: admin.permissions,
        college: admin.college,
      },
    });
  } catch (error) {
    console.error("Error in admin registration:", error);
    res.status(500).json({ message: "Server error in admin registration" });
  }
}

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Admin logged in successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        employeeId: admin.employeeId,
        role: admin.role,
        permissions: admin.permissions,
        college: admin.college,
      },
    });
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ message: "Server error in admin login" });
  }
}