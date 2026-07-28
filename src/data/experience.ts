export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  techBadges: string[];
}

export const experience: Experience[] = [
  {
    role: "Robotics / Systems Software Intern",
    company: "Roboparadigm",
    location: "Hyderabad, India",
    period: "2025 — Present",
    bullets: [
      "Developed advanced motion planning algorithms for 7DOF and OpenManipulator-X robotic arms using ROS 2, MoveIt Task Constructor (MTC), and Gazebo.",
      "Optimized kinematics, collision avoidance, and trajectory execution pipelines for automated pick-and-place tasks.",
      "Integrated real-time sensor feedback loops with ROS 2 nodes for precision spatial manipulation.",
    ],
    techBadges: ["ROS 2", "MoveIt", "C++", "Gazebo", "Docker"],
  },
];
