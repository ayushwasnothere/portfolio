---
title: "Building Motion Planning Pipelines with MoveIt & MoveIt Task Constructor"
slug: "building-motion-planning-pipelines-with-moveit-and-mtc"
date: "2025-10-04"
readTime: "7 min read"
tags: ["Robotics", "ROS 2", "MoveIt", "C++", "OMPL"]
coverImage: "/blogs/moveit_planning.jpg"
summary: "A robotic arm moving from point A to point B is the final result. Motion planning is everything that happens before that movement."
---

# Building Motion Planning Pipelines with MoveIt & MoveIt Task Constructor

> _A robotic arm moving from point A to point B is the final result. Motion planning is everything that happens before that movement._

---

## Act I — Beyond `robot.move()`

One of the biggest misconceptions in robotics is that commanding a robot to move is a simple function call.

In reality, every movement requires solving inverse kinematics, checking collisions, respecting joint limits, generating trajectories, and ensuring the robot can execute them safely.

Our objective was to build a complete manipulation pipeline rather than a collection of static demos.

---

## Act II — Building the First Pipeline

Our initial stack consisted of:

- ROS 2 & MoveIt 2
- OMPL (Open Motion Planning Library)
- URDF & SRDF robot models
- RViz & TF2 transform trees
- Dynamic Planning Scene updates

The first milestone was straightforward: `Current State → Pick → Lift → Place`. Once this worked in simulation, we moved to dynamic scenes.

---

## Act III — Dynamic Pick-and-Place

Unlike tutorial examples where every object starts in a fixed position, our system continuously received new detections.

The planning pipeline became:

```bash
RGB-D Camera
     │
     ▼
Object Detection
     │
     ▼
3D Pose Estimation
     │
     ▼
Planning Scene Update
     │
     ▼
Motion Planning
     │
     ▼
Trajectory Execution
```

Every new detection required the planner to generate a fresh collision-free trajectory.

---

## Act IV — When Planning Started Failing

Planning failures were rarely random. Most came from:

- Impossible wrist orientations
- Joint limits & singularity lockups
- Collision constraints with surrounding obstacles
- Workspace reachability limits
- Inverse kinematics failures

Initially we assumed the planner was broken. After extensive debugging we realised the planner was simply reporting that no valid solution existed for the requested configuration.

---

## Act V — Engineering Better Strategies

Instead of forcing a direct trajectory to the placement pose, we redesigned the manipulation sequence.

The planner now used:

- Approach poses
- Intermediate waypoints
- Circular placement trajectories
- Retreat stages

Breaking one difficult problem into several simpler ones dramatically improved reliability.

---

## Act VI — MoveIt Task Constructor (MTC)

MoveIt Task Constructor (MTC) changed how we thought about manipulation. Instead of planning everything at once, manipulation became a structured sequence of stages:

```bash
Current State
     │
     ▼
Open Gripper
     │
     ▼
Approach Object
     │
     ▼
Generate Grasp
     │
     ▼
Compute IK
     │
     ▼
Close Gripper
     │
     ▼
Lift → Transport → Lower → Release → Retreat
```

Each stage could be debugged independently, making failures transparent and easy to resolve.

---

## Act VII — Transitioning to 7 DOF

After developing our custom 7 DOF manipulator, the exact same planning concepts became significantly more powerful. The redundant joint allowed:

- More inverse kinematics solutions
- Better obstacle avoidance
- Smoother trajectories with fewer joint reversals
- Higher planning success rates
- More natural arm motion

Rather than searching for one possible configuration, MoveIt could evaluate many.

---

## Lessons Learned

Motion planning is not just path generation. It is the combination of kinematics, collision checking, optimization, search algorithms, hardware constraints, and engineering trade-offs.

Building both our 5 DOF pipeline and the later 7 DOF MoveIt Task Constructor system taught us that robust manipulation comes from designing hardware, planning, and execution together—not in isolation.
