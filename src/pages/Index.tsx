import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Apple, Calendar, TrendingUp, Heart, Zap } from "lucide-react";

type BodyType = "ectomorph" | "mesomorph" | "endomorph" | null;
type Goal = "lose" | "gain" | "maintain" | null;

const Index = () => {
  const [bodyType, setBodyType] = useState<BodyType>(null);
  const [goal, setGoal] = useState<Goal>(null);
  const [showPlan, setShowPlan] = useState(false);

  const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "Success starts with self-discipline.",
    "Don't stop when you're tired. Stop when you're done.",
    "The pain you feel today will be the strength you feel tomorrow."
  ];

  const bodyTypeInfo = {
    ectomorph: {
      title: "Ectomorph",
      description: "Naturally lean with fast metabolism",
      calories: { lose: 2200, gain: 3200, maintain: 2700 },
      protein: "30%",
      carbs: "50%",
      fats: "20%"
    },
    mesomorph: {
      title: "Mesomorph",
      description: "Athletic build, gains muscle easily",
      calories: { lose: 2000, gain: 3000, maintain: 2500 },
      protein: "35%",
      carbs: "40%",
      fats: "25%"
    },
    endomorph: {
      title: "Endomorph",
      description: "Larger frame, stores fat more easily",
      calories: { lose: 1800, gain: 2800, maintain: 2300 },
      protein: "40%",
      carbs: "30%",
      fats: "30%"
    }
  };

  const weeklySchedule = {
    monday: { focus: "Upper Body Strength", workout: "Bench Press, Rows, Shoulder Press, Bicep Curls", duration: "60 min" },
    tuesday: { focus: "Lower Body Power", workout: "Squats, Deadlifts, Lunges, Calf Raises", duration: "60 min" },
    wednesday: { focus: "Active Recovery", workout: "Yoga, Stretching, Light Cardio", duration: "30 min" },
    thursday: { focus: "Push Day", workout: "Chest Press, Triceps, Front Raises, Dips", duration: "60 min" },
    friday: { focus: "Pull Day", workout: "Pull-ups, Lat Pulldowns, Face Pulls, Rear Delts", duration: "60 min" }
  };

  const mealPlan = bodyType && goal ? {
    breakfast: [
      { name: "Oatmeal with Berries & Nuts", calories: 450, protein: 15, carbs: 65, fats: 12 },
      { name: "Greek Yogurt Parfait", calories: 380, protein: 25, carbs: 45, fats: 8 }
    ],
    lunch: [
      { name: "Grilled Chicken Breast with Quinoa", calories: 520, protein: 45, carbs: 50, fats: 12 },
      { name: "Salmon Bowl with Brown Rice", calories: 580, protein: 42, carbs: 55, fats: 18 }
    ],
    dinner: [
      { name: "Lean Beef Stir-Fry with Veggies", calories: 480, protein: 40, carbs: 35, fats: 16 },
      { name: "Turkey Meatballs with Sweet Potato", calories: 510, protein: 38, carbs: 48, fats: 14 }
    ],
    snacks: [
      { name: "Protein Shake", calories: 200, protein: 30, carbs: 10, fats: 3 },
      { name: "Apple with Almond Butter", calories: 180, protein: 5, carbs: 20, fats: 9 }
    ]
  } : null;

  const handleStartPlan = () => {
    if (bodyType && goal) {
      setShowPlan(true);
    }
  };

  if (!showPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Dumbbell className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FitPro Elite
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your personalized fitness journey starts here. Get custom meal plans, workouts, and motivation tailored to your body type and goals.
            </p>
          </div>

          {/* Body Type Selection */}
          <Card className="max-w-4xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Step 1: Select Your Body Type
              </CardTitle>
              <CardDescription>Choose the body type that best describes you</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              {(Object.keys(bodyTypeInfo) as BodyType[]).map((type) => type && (
                <Card
                  key={type}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    bodyType === type ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  onClick={() => setBodyType(type)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{bodyTypeInfo[type].title}</CardTitle>
                    <CardDescription className="text-sm">
                      {bodyTypeInfo[type].description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Goal Selection */}
          <Card className="max-w-4xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Step 2: Choose Your Goal
              </CardTitle>
              <CardDescription>What do you want to achieve?</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              {[
                { value: 'lose', label: 'Lose Weight', icon: '🔥' },
                { value: 'gain', label: 'Gain Muscle', icon: '💪' },
                { value: 'maintain', label: 'Maintain & Tone', icon: '⚖️' }
              ].map((g) => (
                <Card
                  key={g.value}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    goal === g.value ? 'ring-2 ring-accent shadow-lg' : ''
                  }`}
                  onClick={() => setGoal(g.value as Goal)}
                >
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{g.icon}</div>
                    <CardTitle className="text-lg">{g.label}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleStartPlan}
              disabled={!bodyType || !goal}
              className="text-lg px-8 py-6"
            >
              <Zap className="w-5 h-5 mr-2" />
              Generate My Custom Plan
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const info = bodyType ? bodyTypeInfo[bodyType] : null;
  const dailyCalories = info && goal ? info.calories[goal] : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Button variant="outline" onClick={() => setShowPlan(false)} className="mb-4">
            ← Back to Setup
          </Button>
          <h1 className="text-4xl font-bold mb-2">Your Personalized Fitness Plan</h1>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-lg px-4 py-1">
              {info?.title}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              {goal === 'lose' ? 'Weight Loss' : goal === 'gain' ? 'Muscle Gain' : 'Maintenance'}
            </Badge>
            <Badge className="text-lg px-4 py-1">
              {dailyCalories} cal/day
            </Badge>
          </div>
        </div>

        {/* Motivational Quote */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="py-6">
            <p className="text-center text-lg font-medium italic">
              "{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}"
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="nutrition" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nutrition" className="flex items-center gap-2">
              <Apple className="w-4 h-4" />
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="workout" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              Workouts
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Weekly Plan
            </TabsTrigger>
          </TabsList>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Macro Breakdown</CardTitle>
                <CardDescription>Your optimal nutrient distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <p className="text-3xl font-bold text-primary">{info?.protein}</p>
                    <p className="text-sm text-muted-foreground">Protein</p>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <p className="text-3xl font-bold text-accent">{info?.carbs}</p>
                    <p className="text-sm text-muted-foreground">Carbs</p>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <p className="text-3xl font-bold text-secondary-foreground">{info?.fats}</p>
                    <p className="text-sm text-muted-foreground">Fats</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {mealPlan && Object.entries(mealPlan).map(([mealType, meals]) => (
                <Card key={mealType}>
                  <CardHeader>
                    <CardTitle className="capitalize">{mealType}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {meals.map((meal, idx) => (
                      <div key={idx} className="border-l-4 border-primary pl-4">
                        <p className="font-semibold">{meal.name}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                          <span>{meal.calories} cal</span>
                          <span>P: {meal.protein}g</span>
                          <span>C: {meal.carbs}g</span>
                          <span>F: {meal.fats}g</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workout Tab */}
          <TabsContent value="workout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Training Philosophy</CardTitle>
                <CardDescription>
                  {bodyType === 'ectomorph' && "Focus on compound movements with progressive overload. Rest 2-3 minutes between sets."}
                  {bodyType === 'mesomorph' && "Balanced approach with both strength and hypertrophy training. Mix heavy and moderate weights."}
                  {bodyType === 'endomorph' && "High-intensity training with shorter rest periods. Focus on metabolic conditioning."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-bold text-primary">4-5x</p>
                      <p className="text-sm text-muted-foreground">Per Week</p>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <p className="text-2xl font-bold text-accent">60 min</p>
                      <p className="text-sm text-muted-foreground">Per Session</p>
                    </div>
                    <div className="text-center p-4 bg-secondary rounded-lg">
                      <p className="text-2xl font-bold text-secondary-foreground">8-12</p>
                      <p className="text-sm text-muted-foreground">Reps Range</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Strength Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Compound lifts (Squat, Deadlift, Bench)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Progressive overload principle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>3-4 sets of 6-8 reps for strength</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Proper form over heavy weight</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cardio & Conditioning</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>
                        {goal === 'lose' ? '30-45 min moderate cardio 4x/week' :
                         goal === 'gain' ? '15-20 min light cardio 2x/week' :
                         '25-30 min moderate cardio 3x/week'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>HIIT sessions for fat burning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Active recovery on rest days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Track heart rate zones</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Weekly Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            {Object.entries(weeklySchedule).map(([day, details]) => (
              <Card key={day}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="capitalize">{day}</CardTitle>
                      <CardDescription>{details.focus}</CardDescription>
                    </div>
                    <Badge variant="outline">{details.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{details.workout}</p>
                </CardContent>
              </Card>
            ))}

            <Card className="border-accent/50 bg-accent/5">
              <CardHeader>
                <CardTitle>Weekend - Rest & Recovery</CardTitle>
                <CardDescription>Essential for muscle growth and preventing burnout</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use Saturday and Sunday for active recovery: light walking, stretching, foam rolling, 
                  or recreational activities. Prioritize sleep and proper nutrition.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
