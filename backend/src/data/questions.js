const questions = [
  // 1. Defensive Driving
  {
    questionText: "What does the SIPDE defensive driving methodology stand for?",
    category: "Defensive Driving",
    options: [
      "Scan, Identify, Predict, Decide, Execute",
      "Stop, Inspect, Position, Drive, Exit",
      "Signal, Indicate, Pass, Decelerate, Evacuate",
      "Speed, Impact, Protection, Distance, Evaluation"
    ],
    correctAnswerIndex: 0,
    explanation: "SIPDE is a standard defensive driving system: Scan the road environment, Identify hazards, Predict behavior, Decide your maneuver, and Execute safely.",
    difficulty: "medium"
  },
  {
    questionText: "Under normal dry road conditions, what is the recommended minimum following distance behind a vehicle ahead?",
    category: "Defensive Driving",
    options: [
      "1 second",
      "At least 3 seconds",
      "Half a vehicle length",
      "5 meters regardless of speed"
    ],
    correctAnswerIndex: 1,
    explanation: "The 3-second rule provides sufficient perception and braking reaction time under normal conditions. This should be increased to 4-5 seconds in rain or fog.",
    difficulty: "easy"
  },
  {
    questionText: "What should you do immediately if your vehicle experiences hydroplaning (aquaplaning) on a wet road?",
    category: "Defensive Driving",
    options: [
      "Slam hard on the brakes immediately",
      "Turn the steering wheel sharply towards the curb",
      "Ease off the accelerator smoothly and hold the steering straight until tires regain grip",
      "Accelerate to cut through the standing water"
    ],
    correctAnswerIndex: 2,
    explanation: "Hard braking or sharp steering during hydroplaning causes total loss of control. Gently ease off the throttle and maintain steady steering until tires re-establish road contact.",
    difficulty: "hard"
  },
  {
    questionText: "When driving at night, when are you legally and safely required to switch from high beam to low beam?",
    category: "Defensive Driving",
    options: [
      "Only inside residential lanes",
      "When within 150-200 meters of an oncoming vehicle or when closely following another car",
      "Only when the other driver flashes their headlights",
      "Never, high beams are always required on highways"
    ],
    correctAnswerIndex: 1,
    explanation: "High beams blind oncoming drivers and reflect off the rearview mirror of leading vehicles. You must dip to low beam when approaching or following other traffic.",
    difficulty: "easy"
  },
  {
    questionText: "What is the most effective way to eliminate blind spots before changing lanes?",
    category: "Defensive Driving",
    options: [
      "Rely solely on the internal rearview mirror",
      "Perform a quick shoulder check (head check) in addition to checking all mirrors",
      "Honk continuously while shifting lanes",
      "Accelerate rapidly into the adjacent lane"
    ],
    correctAnswerIndex: 1,
    explanation: "Side and rearview mirrors cannot show vehicles traveling directly adjacent to your rear quarter panels. A brief shoulder check ensures the blind spot is clear.",
    difficulty: "medium"
  },
  {
    questionText: "What should a defensive driver do when encountering an aggressive, tailgating motorist behind them?",
    category: "Defensive Driving",
    options: [
      "Brake test them to make them back off",
      "Accelerate beyond the speed limit to widen the gap",
      "Maintain a steady speed, increase following distance ahead, and change lanes safely when clear to let them pass",
      "Engage hazard lights and come to a complete stop in the lane"
    ],
    correctAnswerIndex: 2,
    explanation: "Never escalate road rage. Increase your buffer space ahead, remain calm, and smoothly facilitate a safe passing opportunity for the aggressive driver.",
    difficulty: "medium"
  },

  // 2. Traffic Signs & Rules
  {
    questionText: "What shape is a mandatory 'STOP' traffic sign in India and international road conventions?",
    category: "Traffic Signs & Rules",
    options: [
      "Circular with red border",
      "Equilateral triangle pointing downwards",
      "Octagonal (8-sided) with red background and white lettering",
      "Rectangular with blue background"
    ],
    correctAnswerIndex: 2,
    explanation: "The STOP sign is uniquely octagonal so it can be recognized instantly from any angle and even from the reverse side.",
    difficulty: "easy"
  },
  {
    questionText: "What does an inverted triangular road sign (apex pointing downward) indicate?",
    category: "Traffic Signs & Rules",
    options: [
      "School ahead",
      "Give Way / Yield to traffic on the main road",
      "Steep ascent ahead",
      "No entry for heavy vehicles"
    ],
    correctAnswerIndex: 1,
    explanation: "An inverted triangle sign is the 'Give Way' (Yield) regulatory sign, instructing drivers to yield right-of-way to circulating or intersecting traffic.",
    difficulty: "easy"
  },
  {
    questionText: "What does a solid unbroken white or yellow line along the center of a two-way roadway signify?",
    category: "Traffic Signs & Rules",
    options: [
      "Overtaking is permitted if you sound your horn",
      "Strictly no crossing or overtaking across the line; stay within your lane",
      "Lane reserved for heavy commercial vehicles only",
      "Parking permitted on either side"
    ],
    correctAnswerIndex: 1,
    explanation: "A continuous solid center line prohibits crossing or straddling for overtaking, indicating reduced sight distance or high hazard zones.",
    difficulty: "easy"
  },
  {
    questionText: "At an uncontrolled roundabout (traffic circle) without signals in India, who has the primary right of way?",
    category: "Traffic Signs & Rules",
    options: [
      "Vehicles entering the roundabout at highest speed",
      "Vehicles already circulating within the roundabout approaching from your right",
      "The larger vehicle regardless of position",
      "Vehicles entering from public highway roads"
    ],
    correctAnswerIndex: 1,
    explanation: "Traffic already inside the roundabout approaching from your right has right of way over entering vehicles unless signals dictate otherwise.",
    difficulty: "medium"
  },
  {
    questionText: "Under the Motor Vehicles (Amendment) Act, what is the legal blood alcohol concentration (BAC) limit above which driving is a penal offense?",
    category: "Traffic Signs & Rules",
    options: [
      "50 mg per 100 ml of blood",
      "30 mg per 100 ml of blood detected by breathalyzer",
      "80 mg per 100 ml of blood",
      "Zero tolerance for all, and 100 mg for experienced drivers"
    ],
    correctAnswerIndex: 1,
    explanation: "In India, Section 185 of the Motor Vehicles Act sets the legal limit at 30 mg per 100 ml of blood; exceeding this incurs heavy fines and imprisonment.",
    difficulty: "medium"
  },
  {
    questionText: "When is it permissible to overtake a vehicle from its left-hand side on Indian roads?",
    category: "Traffic Signs & Rules",
    options: [
      "Whenever the driver ahead is driving slower than you",
      "When the vehicle ahead has signaled and is making a right turn, or in one-way multi-lane roads when safe",
      "Anytime on four-lane expressways",
      "Never under any circumstances"
    ],
    correctAnswerIndex: 1,
    explanation: "Standard overtaking is on the right. Left overtaking is only permitted if the lead vehicle has signaled and commenced a right turn, or on specified multi-lane one-way streets.",
    difficulty: "medium"
  },

  // 3. Vehicle Safety & Maintenance
  {
    questionText: "What is the minimum safe and legal tire tread depth for passenger cars in India?",
    category: "Vehicle Safety & Maintenance",
    options: [
      "0.5 mm",
      "1.6 mm across the central three-quarters of the tread",
      "3.5 mm",
      "Smooth tires are acceptable in summer"
    ],
    correctAnswerIndex: 1,
    explanation: "1.6 mm is the legal minimum tread depth. Tread wear indicators (bars) in tire grooves alert drivers when tread is dangerously worn down.",
    difficulty: "medium"
  },
  {
    questionText: "What does the ABS (Anti-lock Braking System) warning indicator illuminate on the dashboard signify?",
    category: "Vehicle Safety & Maintenance",
    options: [
      "The emergency handbrake is applied",
      "Normal brakes may still work, but anti-skid wheel lockup prevention is malfunctioning",
      "Brake fluid level is overfilled",
      "The vehicle needs immediate tire rotation"
    ],
    correctAnswerIndex: 1,
    explanation: "When the ABS light stays illuminated, the computerized anti-lock pulse system is disabled. Conventional braking works, but wheels may lock up during panic stops.",
    difficulty: "medium"
  },
  {
    questionText: "How often should tire pressure be checked, and what condition should the tires be in?",
    category: "Vehicle Safety & Maintenance",
    options: [
      "Once a year when tires are warm after a long highway trip",
      "At least once every 1-2 weeks or before long journeys, when tires are cold",
      "Only when the tire visually appears deflated",
      "Every oil change only"
    ],
    correctAnswerIndex: 1,
    explanation: "Tire pressure should be checked when tires are cold (before driving or driven less than 2 km) because heat buildup artificially increases measured pressure.",
    difficulty: "easy"
  },
  {
    questionText: "Why is wearing a three-point lap-and-sash seatbelt mandatory for all occupants including rear passengers?",
    category: "Vehicle Safety & Maintenance",
    options: [
      "To prevent internal cabin draft",
      "To prevent secondary impacts, ejection from the vehicle, and reduce collision g-forces on vital organs",
      "Only to avoid police fines",
      "To ensure the vehicle's engine operates at peak torque"
    ],
    correctAnswerIndex: 1,
    explanation: "Seatbelts spread impact energy across resilient skeletal structures (pelvis and ribcage), stopping passengers from striking vehicle interiors or being ejected.",
    difficulty: "easy"
  },
  {
    questionText: "What pre-trip inspection routine (FLOWER / POWER check) should every driver perform before long highway trips?",
    category: "Vehicle Safety & Maintenance",
    options: [
      "Fuel, Lights, Oil, Water (coolant/washer), Electrics/Battery, Rubber (tires/wipers)",
      "Floor, Luggage, Owner manual, Windows, Exhaust, Radio",
      "Fast driving, Low gears, Overdrive, Warning lights, Engine revs",
      "Only verify fuel gauge and air conditioning"
    ],
    correctAnswerIndex: 0,
    explanation: "The FLOWER check (Fuel, Lights, Oil, Water/coolant, Electrics/Battery, Rubber/tires) is the standard pre-departure safety checklist taught by ECCO.",
    difficulty: "medium"
  },

  // 4. First Aid & Emergency Response
  {
    questionText: "In road traffic trauma management, what is defined as the 'Golden Hour'?",
    category: "First Aid & Emergency Response",
    options: [
      "The first hour of sunrise with maximum traffic visibility",
      "The first 60 minutes post-trauma where prompt medical intervention drastically increases survival rates",
      "The statutory time given to file an insurance claim",
      "The time police have to clear vehicle wreckage"
    ],
    correctAnswerIndex: 1,
    explanation: "The Golden Hour refers to the crucial first hour following critical injury, during which timely resuscitation and definitive medical care saves lives.",
    difficulty: "easy"
  },
  {
    questionText: "What does the 'PASS' acronym signify when operating a portable fire extinguisher during a vehicle fire?",
    category: "First Aid & Emergency Response",
    options: [
      "Position, Aim, Spray, Stop",
      "Pull the pin, Aim at the base of the fire, Squeeze the lever, Sweep side to side",
      "Press button, Activate nozzle, Spread foam, Secure area",
      "Protect self, Alert others, Stand back, Smother flames"
    ],
    correctAnswerIndex: 1,
    explanation: "PASS is the universal fire extinguisher technique: Pull the pin, Aim at the base of flames (not the smoke), Squeeze the handle, and Sweep across the fire base.",
    difficulty: "easy"
  },
  {
    questionText: "What is the legal protection provided to bystanders who assist road crash victims under the Indian Good Samaritan Law?",
    category: "First Aid & Emergency Response",
    options: [
      "Helpers are held financially liable for hospital bills",
      "Bystanders are protected from civil and criminal liability and cannot be forced to disclose personal details or stay in hospitals",
      "Helpers are required to deposit cash at the police station",
      "Only licensed doctors are allowed to help"
    ],
    correctAnswerIndex: 1,
    explanation: "Under the Good Samaritan guidelines affirmed by the Supreme Court of India and MV Act Section 134A, individuals who help accident victims are protected from harassment and legal liabilities.",
    difficulty: "easy"
  },
  {
    questionText: "If an accident victim is unconscious but breathing normally and has no suspected spine fracture, what position should they be placed in?",
    category: "First Aid & Emergency Response",
    options: [
      "Head down with legs elevated above chest",
      "Face down on their stomach",
      "The Recovery Position (lateral recumbent position on their side)",
      "Seated upright against a tree"
    ],
    correctAnswerIndex: 2,
    explanation: "The Recovery Position keeps the airway clear, prevents the tongue from obstructing breathing, and stops fluid/vomit from being inhaled into the lungs.",
    difficulty: "medium"
  },
  {
    questionText: "What should you NEVER do when dealing with a victim suffering from an impaled object or deep penetrating wound?",
    category: "First Aid & Emergency Response",
    options: [
      "Call emergency medical services immediately",
      "Remove or pull out the impaled object at the accident site",
      "Stabilize the object with rolled bandages around it",
      "Keep the victim calm and still"
    ],
    correctAnswerIndex: 1,
    explanation: "Never remove an impaled object at the roadside; the object acts as a plug for damaged arteries. Removing it can cause uncontrollable fatal hemorrhage.",
    difficulty: "medium"
  },
  {
    questionText: "At what distance behind a disabled vehicle on an expressway should reflective warning breakdown triangles be placed?",
    category: "First Aid & Emergency Response",
    options: [
      "1 meter directly behind the trunk",
      "At least 50 to 100 meters behind the vehicle to give high-speed traffic ample stopping warning",
      "Only on the roof of the vehicle",
      "Warning triangles are not required if hazard lights are blinking"
    ],
    correctAnswerIndex: 1,
    explanation: "On highways and expressways, warning triangles must be placed 50-100 meters behind the vehicle on the shoulder to warn high-speed motorists in time.",
    difficulty: "medium"
  },
  {
    questionText: "What is the recommended compression-to-breath ratio when administering adult CPR (Cardiopulmonary Resuscitation)?",
    category: "First Aid & Emergency Response",
    options: [
      "10 compressions to 5 breaths",
      "30 chest compressions followed by 2 rescue breaths (at a rate of 100-120 compressions per minute)",
      "50 rapid compressions and no breaths",
      "15 compressions to 4 breaths"
    ],
    correctAnswerIndex: 1,
    explanation: "Standard adult basic life support CPR uses a ratio of 30 chest compressions (5-6 cm deep at 100-120 bpm) followed by 2 rescue breaths.",
    difficulty: "hard"
  }
];

module.exports = questions;
