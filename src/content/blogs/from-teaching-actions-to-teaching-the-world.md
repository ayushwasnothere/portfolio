---
title: "From Teaching Actions to Teaching the World: How World Action Models Changed My Perspective on Robotics"
slug: "from-teaching-actions-to-teaching-the-world"
date: "2026-05-19"
readTime: "12 min read"
tags: ["Robotics", "Embodied AI", "Computer Vision", "VLA", "WAM", "Foundation Models", "Robot Learning"]
coverImage: "/blogs/wam_cover.jpg"
summary: "A personal journey from Vision-Language-Action models to World Action Models, and why it completely changed how I think about robotic intelligence."
---

# From Teaching Actions to Teaching the World

> *"The biggest shift in my robotics journey wasn't learning a new model. It was realizing I was asking the wrong question."*

For the last few years, robotics has been going through something that feels remarkably similar to what happened in natural language processing after the introduction of transformers.

For decades, robotics researchers built systems by carefully engineering every individual component. Object detection was one model. Motion planning was another. Grasp generation was another. Task planning lived somewhere else entirely. Every subsystem was designed, tuned, and optimized independently before being stitched together into a functioning robot.

It worked.

Until it didn't.

As robots started moving from research labs into warehouses, factories, homes, and hospitals, one thing became painfully obvious: building individual modules wasn't enough anymore.

Robots needed to understand their environment, reason about language, generalize to unseen situations, and manipulate objects they had never encountered before.

The industry began moving toward foundation models for robotics: Vision-Language-Action models, Embodied AI, Generalist policies, and massive robot datasets.

OpenVLA. π₀. RT-2. GR00T. LingBot. Dream. Figure AI. Physical Intelligence. Google DeepMind.

The field was evolving faster than ever. Like many engineers, I naturally gravitated toward Vision-Language-Action models.

At first glance, they felt like the obvious future. Give the robot images. Give it language. Predict actions. Repeat. Simple. Or at least it seemed that way.

---

# Building Our First Architecture

Around this time, I had been working extensively on robotic manipulation: building pick-and-place pipelines, experimenting with MoveIt, working on custom robotic arms, and training policies to make robots perform useful tasks reliably.

One question kept coming back: **How do we make robots perform increasingly complex tasks without training one gigantic model?**

Training one enormous policy capable of every possible household or industrial task didn't seem practical. It would require enormous datasets, huge computational resources, and constant retraining.

Instead, we started thinking more like software engineers: What if robot intelligence wasn't one massive neural network? What if it looked more like modular software?

The idea was surprisingly straightforward. Instead of one monolithic policy, we would build dozens of small ones — each responsible for exactly one capability:

```bash
                Robot Skills

          Pick Object Policy
                 │
          Place Object Policy
                 │
          Push Object Policy
                 │
          Pull Drawer Policy
                 │
          Rotate Handle Policy
                 │
           Pour Liquid Policy
                 │
          Stack Objects Policy
```

Each model would specialize. Nothing more. Nothing less.

Then we could introduce an orchestrator. Its job wouldn't be to manipulate the robot directly — instead, it would decide **which policy should execute next.**

Imagine telling the robot:
> "Pick up the red mug, place it on the table, and pour water into it."

Rather than asking one gigantic model to solve everything simultaneously, the orchestrator could break the problem into smaller pieces:

```bash
Language Instruction
        │
        ▼
 Task Planner / Orchestrator
        │
 ┌──────┼──────────┐
 ▼      ▼          ▼
Pick   Place     Pour
Policy Policy    Policy
```

The architecture felt elegant. It borrowed ideas from distributed systems, microservices, operating systems, and even the human brain. Instead of one enormous expert — many specialists working together.

---

# Why Micro Policies Were So Appealing

The more we explored the idea, the more advantages we found:
- Each policy became significantly easier to train.
- Failures became isolated. If grasping performance improved, only the grasping policy needed updating.
- Different teams could develop different policies independently.
- Need a better pouring policy? Swap it. Need a completely different robot? Only retrain the embodiment-specific policies.

From an engineering perspective, this architecture was beautiful: small, composable, reusable, and testable.

Unfortunately... reality had other plans.

---

# The Problem We Couldn't Ignore

The issue wasn't the architecture, the models, or GPU compute. It was **data**.

Every single policy needed demonstrations — not ten, but sometimes hundreds or thousands. Every new robotic capability required someone to physically perform that task again and again.

A single "Pick" policy might require thousands of successful demonstrations collected across different lighting conditions, camera positions, object geometries, grasp orientations, and robot configurations.

Now multiply that by every capability: Pick, Place, Rotate, Push, Pull, Pour, Open, Close, Insert, Stack, Wipe, Fold, Press, Turn, Slide.

Unlike language models, robotics doesn't get to scrape the internet. There aren't billions of robot demonstrations waiting to be downloaded. Every single trajectory costs time, money, hardware, and human effort. Physical interaction doesn't scale at the speed of text writing.

The bottleneck wasn't compute or model size — it was **experience**. Robots simply don't have enough of it.

---

# A Different Question

For weeks, I kept searching for better policy architectures, better datasets, or better imitation learning algorithms.

Eventually I realized something: every solution I was considering still assumed the same fundamental idea — *teach the robot another action.*

I had been asking:
> **How do we teach robots more actions?**

But perhaps that wasn't the right question. Maybe the better question was:
> **Why do robots need to learn every action individually in the first place?**

That single thought completely changed how I viewed robot learning.

---

# The Video That Changed Everything

My turning point came from a YouTube presentation discussing **World Action Models (WAM)**.

Until that point, almost every policy I worked with shared one common idea:

```bash
Current Observation
        │
        ▼
 Neural Network
        │
        ▼
 Next Robot Action
```

The model looked at camera images, robot states, and language, and predicted the next action.

The detail I had completely overlooked was this: **The model wasn't learning *why* something happened. It was learning *what to do next*.**

Imagine teaching someone to drive:
1. **Memorizing Actions**: "If light turns red, press brake. If road curves, turn wheel."
2. **Understanding Physics**: Teach momentum, friction, braking distance, and traction. Now they reason through scenarios they have never seen before.

Vision-Language-Action models resembled the first approach. Every new capability required another dataset.

---

# Enter World Action Models

World Action Models introduce a different premise: Instead of directly predicting actions — **predict the world**.

Instead of asking:
> *"What should the robot do next?"*

Ask:
> *"What is going to happen next?"*

```bash
Observation
      │
      ▼
Internal World Model
      │
Predict Future States
      │
Reason About Outcomes
      │
Choose Action
      ▼
Robot Motion
```

The action is no longer the primary output of intelligence — it becomes the consequence of understanding.

If a robot truly understands gravity, friction, and rigid body dynamics, pushing one object teaches something about pushing many objects. Thousands of explicit action demonstrations become unnecessary.

---

# VLA vs WAM — Where Each One Excels

Vision-Language-Action (VLA) models and World Action Models (WAM) attempt to answer fundamentally different questions:

- **VLA asks**: *"Given what I see, what should I do next?"* (Excels at language grounding, direct execution, and human intent translation).
- **WAM asks**: *"Given what I understand about the world, what will happen if I do this?"* (Excels at predicting physical consequences, physics reasoning, and zero-shot dynamics).

They aren't competing paradigms — they are complementary:

```bash
Human Instruction
        │
        ▼
 Large Language Model
        │
Task Planning
        │
        ▼
 World Action Model (Predict Consequences)
        │
        ▼
 Vision-Language-Action Policy (Execute Behavior)
        │
        ▼
Robot Motion
```

Language determines *what* should happen. A world model predicts *what will happen*. An action policy determines *how to make it happen.*

---

# Looking Ahead

Robotics is changing at an incredible pace. For me, learning about World Action Models expanded my perspective.

I started this journey believing that intelligence came from teaching robots enough actions. Today, I think intelligence comes from something much deeper: **Not memorizing behavior, but understanding the world that behavior exists within.**

---

## References

- [World Action Models Presentation (YouTube)](https://youtu.be/3Y8aq_ofEVs)
- [OpenVLA Paper & Project Page](https://openvla.github.io/)
- [Google DeepMind RT-2](https://robotics-transformer2.github.io/)
- [NVIDIA Isaac GR00T](https://developer.nvidia.com/isaac/gr00t)
- [Physical Intelligence](https://www.physicalintelligence.company/)
