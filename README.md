# lifting_tracker2.0

## Coach Line Logic (Algorithm)

The coach line is **calculated**, not randomized.  
For the same workout state, it will always produce the same advice.

### 1. Drafting Stage
- If you haven’t logged anything yet, the coach guides you to start simply  
  *(one lift, one clean set)*.
- If you’re typing sets but haven’t added the exercise to the log, the coach:
  - Detects what’s missing (weight vs reps), or
  - Nudges you to finish and add the exercise.

### 2. Personal Baseline (Last 14 Days)
- The app loads your workouts from the last **14 days**.
- For each exercise (Bench Press, Squat, Deadlift, etc.), it records your  
  **best (heaviest) set weight** during that period.
- This forms a rolling, personal baseline — not a global standard.

### 3. Compare Today to Your Baseline
- The coach identifies your **main lift** for the day as the exercise with the
  heaviest top set you logged.
- If today’s top set is **≥ 90% of your best set in the last 14 days**, it is
  treated as a **relative heavy day**.
- On relative heavy days, the coach prioritizes strict technique and recovery
  cues over volume.

### 4. Exercise-Specific Cues
Advice adapts based on the type of lift:

- **Bench / Press (push)**  
  *Shoulder blades back, controlled touch, drive straight up.*
- **Row / Pulldown (pull)**  
  *Elbows down and back, pause the squeeze, don’t swing.*
- **Squat / Leg movements**  
  *Brace hard, knees track over toes, controlled depth.*
- **Deadlift / Hinge**  
  *Brace first, hinge clean, keep lats tight, no yanking.*
- **Other / General**  
  *Smooth reps, full range, no ego.*

### 5. If It’s Not a Heavy Day
- The coach uses **average reps per set** to infer intent:
  - Lower reps → strength-focused guidance
  - Higher reps → control, tempo, and fatigue management cues
- If needed, **session size** (few sets vs many sets) is used to:
  - Encourage saving early on short sessions, or
  - Prevent junk volume on longer sessions.

---

