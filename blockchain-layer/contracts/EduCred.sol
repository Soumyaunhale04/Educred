// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EduCred {
    address public admin;

    struct Student {
        string studentId;
        uint256 totalCredits;
        bool exists;
    }

    mapping(address => Student) public students;

    event CertificateUploaded(address indexed student, string certHash, uint256 creditsAdded);
    event CourseCreditsGranted(address indexed student, uint256 creditsAdded);
    event StudentRegistered(address indexed student, string studentId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerStudent(address _student, string memory _studentId) public onlyAdmin {
        require(!students[_student].exists, "Student already registered");
        students[_student] = Student(_studentId, 0, true);
        emit StudentRegistered(_student, _studentId);
    }

    function uploadCertificate(string memory _certHash) public {
        require(students[msg.sender].exists, "Student not registered");
        students[msg.sender].totalCredits += 2; // Add 2 credits
        emit CertificateUploaded(msg.sender, _certHash, 2);
    }

    function grantCourseCredits(address _student) public onlyAdmin {
        require(students[_student].exists, "Student not registered");
        students[_student].totalCredits += 5; // Add 5 credits
        emit CourseCreditsGranted(_student, 5);
    }

    function getStudentCredits(address _student) public view returns (uint256) {
        return students[_student].totalCredits;
    }
}
