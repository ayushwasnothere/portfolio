---
title: "From 5 DOF to 7 DOF: How One Extra Joint Changed Everything"
slug: "from-5dof-to-7dof-how-one-extra-joint-changed-everything"
date: "2025-09-01"
readTime: "6 min read"
tags: ["Robotics", "ROS 2", "MoveIt", "Kinematics", "Hardware"]
coverImage: "/blogs/robotic_arm_7dof.jpg"
summary: "Sometimes the most important breakthrough in robotics isn't a better algorithm — it's understanding the limitations of the hardware you're asking that algorithm to control."
---

# From 5 DOF to 7 DOF: How One Extra Joint Changed Everything

> *Sometimes the most important breakthrough in robotics isn't a better algorithm—it's understanding the limitations of the hardware you're asking that algorithm to control.*

---

## Act I — Every Robotics Journey Starts Small

When people see an autonomous robotic arm smoothly picking up an object, avoiding obstacles, and placing it precisely into a container, it looks effortless.

Behind that seemingly simple motion lies months of engineering, failed experiments, motion-planning dead ends, inverse kinematics problems, and countless hours staring at RViz wondering why a trajectory that looked perfectly valid simply refused to execute.

Our journey started the same way.

Instead of beginning with an expensive industrial manipulator, we chose an educational 5 DOF robotic arm. The goal wasn't merely to move motors—it was to build a complete autonomous manipulation stack using ROS 2, MoveIt 2, perception, and motion planning.

Like many first robotics projects, our expectations were simple:
1. If the robot can detect an object...
2. Then MoveIt should plan a path...
3. The arm should pick it up...
4. Move to another location...
5. And place it.

Reality turned out to be much more interesting.

---

## Act II — Building Our First Manipulation Pipeline

The project quickly grew beyond a simple robotic arm. We integrated:

- **ROS 2** (Robot Operating System core middleware)
- **MoveIt 2** & **OMPL** (Sampling-based motion planners)
- **Vision-based object detection** & dynamic planning
- **Collision-aware execution**

Eventually the robot could detect objects, generate trajectories, execute picks, and complete manipulation tasks. Watching the first successful autonomous pick-and-place felt like a major milestone. For a while we believed the difficult part was over.

It wasn't.

---

## Act III — Picking Was Easy. Placing Was Not.

The biggest surprise was that grasping objects was rarely the difficult part. Placing them consistently was.

- Some target poses failed **inverse kinematics (IK)**.
- Others exceeded **joint limits**.
- Some required impossible **wrist orientations**.
- Others caused self-collisions despite appearing reachable.

Initially we blamed MoveIt, then OMPL, then the IK solver. Only later did we realise something important: **The planner wasn't failing. The robot simply lacked enough freedom to satisfy every positional and orientation constraint simultaneously.**

---

## Act IV — Engineering Around Hardware

Rather than abandoning the project, we engineered around the limitations. Instead of planning directly to the final pose we introduced:

- Intermediate waypoints
- Circular placement trajectories
- Better approach vectors & safer retreat motions

These ideas dramatically improved success rates and taught us an important engineering lesson: **Sometimes changing the strategy is more effective than changing the algorithm.**

---

## Act V — Understanding Degrees of Freedom

A rigid object in three-dimensional space requires six independent parameters:
`X`, `Y`, `Z`, `Roll`, `Pitch`, and `Yaw`.

That means six independent motions are required for arbitrary pose control.

A 5 DOF arm can perform many useful manipulation tasks, but there will always be poses that cannot be achieved regardless of how clever the planner is.

A 7 DOF arm, however, introduces **kinematic redundancy**. Instead of one possible configuration, the planner may discover many. That additional freedom allows obstacle avoidance, smoother trajectories, fewer singularities, and more natural motion.

---

## Act VI — Why We Built a 7 DOF Arm

Eventually it became clear that software optimisations alone could not solve every problem. The solution was redesigning the robot itself.

Adding one additional joint fundamentally changed motion planning. Instead of searching for a single valid configuration, MoveIt could choose among multiple valid solutions while considering collisions, joint limits, and trajectory quality.

The result wasn't just better planning — it was a robot that behaved more naturally.

---

## Lessons Learned

Looking back, the transition from a 5 DOF manipulator to a custom 7 DOF platform taught us lessons far beyond robotics:

- Better software cannot always compensate for hardware limitations.
- Motion planning is constrained by kinematics before algorithms.
- Engineering progress often comes from understanding *why* something fails rather than simply making it work.
- One additional degree of freedom can completely change what is possible.

This project started as an attempt to build an autonomous robotic arm. It became a lesson in robotics, engineering trade-offs, and the importance of designing hardware and software together.

---

## What's Next?

This article is the first in a three-part engineering series:

1. **From 5 DOF to 7 DOF: How One Extra Joint Changed Everything**
2. **Building Motion Planning Pipelines with MoveIt & MoveIt Task Constructor**
3. **From Camera to Gripper: Building an Autonomous Manipulation Pipeline**
