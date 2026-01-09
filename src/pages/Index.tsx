import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dumbbell, Apple, Calendar, TrendingUp, Heart, Zap, Plus, X, Flame, Target, Clock, ChevronRight, Sparkles } from "lucide-react";

type BodyType = "ectomorph" | "mesomorph" | "endomorph" | null;
type Goal = "lose" | "gain" | "maintain" | null;

const Index = () => {
  const [bodyType, setBodyType] = useState<BodyType>(null);
  const [goal, setGoal] = useState<Goal>(null);
  const [showPlan, setShowPlan] = useState(false);
  const [customQuotes, setCustomQuotes] = useState<string[]>([]);
  const [newQuote, setNewQuote] = useState("");

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
      fats: "20%",
      icon: "🏃"
    },
    mesomorph: {
      title: "Mesomorph",
      description: "Athletic build, gains muscle easily",
      calories: { lose: 2000, gain: 3000, maintain: 2500 },
      protein: "35%",
      carbs: "40%",
      fats: "25%",
      icon: "💪"
    },
    endomorph: {
      title: "Endomorph",
      description: "Larger frame, stores fat more easily",
      calories: { lose: 1800, gain: 2800, maintain: 2300 },
      protein: "40%",
      carbs: "30%",
      fats: "30%",
      icon: "🏋️"
    }
  };

  const weeklySchedule = {
    monday: { focus: "Upper Body Strength", workout: "Bench Press, Rows, Shoulder Press, Bicep Curls", duration: "60 min", intensity: 85 },
    tuesday: { focus: "Lower Body Power", workout: "Squats, Deadlifts, Lunges, Calf Raises", duration: "60 min", intensity: 90 },
    wednesday: { focus: "Active Recovery", workout: "Yoga, Stretching, Light Cardio", duration: "30 min", intensity: 40 },
    thursday: { focus: "Push Day", workout: "Chest Press, Triceps, Front Raises, Dips", duration: "60 min", intensity: 80 },
    friday: { focus: "Pull Day", workout: "Pull-ups, Lat Pulldowns, Face Pulls, Rear Delts", duration: "60 min", intensity: 85 }
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

  const handleAddQuote = () => {
    if (newQuote.trim()) {
      setCustomQuotes([...customQuotes, newQuote.trim()]);
      setNewQuote("");
    }
  };

  const handleRemoveQuote = (index: number) => {
    setCustomQuotes(customQuotes.filter((_, i) => i !== index));
  };

  const allQuotes = [...motivationalQuotes, ...customQuotes];

  const dailyQuote = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    const quoteIndex = dayOfYear % allQuotes.length;
    return allQuotes[quoteIndex];
  }, [allQuotes]);

  if (!showPlan) {
    return (
      <div className="min-h-screen bg-background dark">
        {/* Premium Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full" />
                <div className="relative bg-gradient-to-br from-primary to-emerald-600 p-5 rounded-2xl shadow-glow">
                  <Dumbbell className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
              <span className="text-gradient">FitPro</span>
              <span className="text-foreground"> Elite</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your personalized fitness journey starts here. Custom meal plans, 
              workouts, and motivation tailored to <span className="text-foreground font-medium">your body, your goals</span>.
            </p>
          </div>

          {/* Body Type Selection */}
          <div className="max-w-5xl mx-auto mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Step 1: Body Type</h2>
                <p className="text-sm text-muted-foreground">Choose the type that best describes you</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {(Object.keys(bodyTypeInfo) as BodyType[]).map((type) => type && (
                <Card
                  key={type}
                  className={`cursor-pointer transition-all duration-300 hover-lift glass border-2 ${
                    bodyType === type 
                      ? 'border-primary shadow-glow bg-primary/5' 
                      : 'border-transparent hover:border-primary/30'
                  }`}
                  onClick={() => setBodyType(type)}
                >
                  <CardHeader className="pb-3">
                    <div className="text-4xl mb-3">{bodyTypeInfo[type].icon}</div>
                    <CardTitle className="text-xl font-bold">{bodyTypeInfo[type].title}</CardTitle>
                    <CardDescription className="text-sm">
                      {bodyTypeInfo[type].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {bodyType === type && (
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        Selected
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Goal Selection */}
          <div className="max-w-5xl mx-auto mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Step 2: Your Goal</h2>
                <p className="text-sm text-muted-foreground">What do you want to achieve?</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { value: 'lose', label: 'Lose Weight', icon: Flame, description: 'Burn fat & get lean', color: 'text-orange-500' },
                { value: 'gain', label: 'Gain Muscle', icon: TrendingUp, description: 'Build mass & strength', color: 'text-primary' },
                { value: 'maintain', label: 'Maintain & Tone', icon: Heart, description: 'Stay fit & defined', color: 'text-pink-500' }
              ].map((g) => (
                <Card
                  key={g.value}
                  className={`cursor-pointer transition-all duration-300 hover-lift glass border-2 ${
                    goal === g.value 
                      ? 'border-accent shadow-glow-accent bg-accent/5' 
                      : 'border-transparent hover:border-accent/30'
                  }`}
                  onClick={() => setGoal(g.value as Goal)}
                >
                  <CardHeader className="text-center pb-3">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted/50 ${g.color} mx-auto mb-3`}>
                      <g.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-lg font-bold">{g.label}</CardTitle>
                    <CardDescription className="text-sm">{g.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 text-center">
                    {goal === g.value && (
                      <div className="flex items-center justify-center gap-2 text-accent text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        Selected
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom Quotes Section */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted text-muted-foreground">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Your Motivation</h2>
                <p className="text-sm text-muted-foreground">Add personal quotes (optional)</p>
              </div>
            </div>
            <Card className="glass border-border/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-3">
                  <Textarea
                    placeholder="Enter your motivational quote..."
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    className="flex-1 bg-muted/50 border-border/50 focus:border-primary resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={handleAddQuote} 
                    disabled={!newQuote.trim()}
                    className="px-4 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
                {customQuotes.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {customQuotes.map((quote, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl group">
                        <span className="text-primary text-lg">"</span>
                        <p className="flex-1 text-sm text-foreground/80 italic">{quote}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveQuote(index)}
                          className="h-8 w-8 opacity-50 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleStartPlan}
              disabled={!bodyType || !goal}
              className="group relative text-lg px-10 py-7 rounded-2xl font-bold bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-glow transition-all duration-300 disabled:opacity-40 disabled:shadow-none"
            >
              <Zap className="w-5 h-5 mr-2" />
              Generate My Plan
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
            {(!bodyType || !goal) && (
              <p className="text-sm text-muted-foreground mt-4">
                Select your body type and goal to continue
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const info = bodyType ? bodyTypeInfo[bodyType] : null;
  const dailyCalories = info && goal ? info.calories[goal] : 0;

  return (
    <div className="min-h-screen bg-background dark">
      {/* Premium Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <Button 
            variant="ghost" 
            onClick={() => setShowPlan(false)} 
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            ← Back to Setup
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black mb-2">
                Your <span className="text-gradient">Personalized</span> Plan
              </h1>
              <p className="text-muted-foreground">Crafted for your success</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Badge className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                {info?.icon} {info?.title}
              </Badge>
              <Badge className="px-4 py-2 text-sm font-semibold bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
                {goal === 'lose' ? '🔥 Weight Loss' : goal === 'gain' ? '💪 Muscle Gain' : '⚖️ Maintenance'}
              </Badge>
              <Badge className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-primary to-emerald-600 text-primary-foreground">
                {dailyCalories} cal/day
              </Badge>
            </div>
          </div>
        </div>

        {/* Daily Motivation Engine */}
        <Card className="mb-10 overflow-hidden border-0 shadow-premium">
          <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 p-8">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-3">
                <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
                Quote of the Day
              </div>
              <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed max-w-3xl">
                "{dailyQuote}"
              </p>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="nutrition" className="space-y-8">
          <TabsList className="w-full h-auto p-1.5 bg-muted/50 rounded-2xl grid grid-cols-3 gap-1">
            <TabsTrigger value="nutrition" className="flex items-center gap-2 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md font-semibold">
              <Apple className="w-4 h-4" />
              <span className="hidden sm:inline">Nutrition</span>
            </TabsTrigger>
            <TabsTrigger value="workout" className="flex items-center gap-2 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md font-semibold">
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Workouts</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md font-semibold">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Weekly</span>
            </TabsTrigger>
          </TabsList>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-8">
            {/* Macro Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="glass border-primary/20 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                    <span className="text-2xl font-black">{info?.protein}</span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Protein</h3>
                  <p className="text-sm text-muted-foreground">Build & repair muscle</p>
                </CardContent>
              </Card>
              <Card className="glass border-accent/20 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-4">
                    <span className="text-2xl font-black">{info?.carbs}</span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Carbs</h3>
                  <p className="text-sm text-muted-foreground">Fuel your workouts</p>
                </CardContent>
              </Card>
              <Card className="glass border-pink-500/20 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pink-500/10 text-pink-500 mb-4">
                    <span className="text-2xl font-black">{info?.fats}</span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Fats</h3>
                  <p className="text-sm text-muted-foreground">Hormone health</p>
                </CardContent>
              </Card>
            </div>

            {/* Meal Plan */}
            <div className="grid md:grid-cols-2 gap-6">
              {mealPlan && Object.entries(mealPlan).map(([mealType, meals]) => (
                <Card key={mealType} className="glass overflow-hidden">
                  <CardHeader className="bg-muted/30 pb-4">
                    <CardTitle className="capitalize flex items-center gap-2">
                      {mealType === 'breakfast' && '🌅'}
                      {mealType === 'lunch' && '☀️'}
                      {mealType === 'dinner' && '🌙'}
                      {mealType === 'snacks' && '🍎'}
                      {mealType}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {meals.map((meal, idx) => (
                      <div key={idx} className="relative pl-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-primary before:to-accent">
                        <p className="font-semibold text-foreground mb-2">{meal.name}</p>
                        <div className="flex flex-wrap gap-3 text-xs">
                          <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">{meal.calories} cal</span>
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">P: {meal.protein}g</span>
                          <span className="px-2 py-1 rounded-full bg-accent/10 text-accent">C: {meal.carbs}g</span>
                          <span className="px-2 py-1 rounded-full bg-pink-500/10 text-pink-500">F: {meal.fats}g</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workout Tab */}
          <TabsContent value="workout" className="space-y-8">
            <Card className="glass overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Training Philosophy
                </CardTitle>
                <CardDescription className="text-foreground/70">
                  {bodyType === 'ectomorph' && "Focus on compound movements with progressive overload. Rest 2-3 minutes between sets."}
                  {bodyType === 'mesomorph' && "Balanced approach with both strength and hypertrophy training. Mix heavy and moderate weights."}
                  {bodyType === 'endomorph' && "High-intensity training with shorter rest periods. Focus on metabolic conditioning."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-5 bg-primary/5 rounded-2xl border border-primary/10">
                    <p className="text-3xl font-black text-gradient mb-1">4-5x</p>
                    <p className="text-sm text-muted-foreground font-medium">Per Week</p>
                  </div>
                  <div className="text-center p-5 bg-accent/5 rounded-2xl border border-accent/10">
                    <p className="text-3xl font-black text-gradient-accent mb-1">60 min</p>
                    <p className="text-sm text-muted-foreground font-medium">Per Session</p>
                  </div>
                  <div className="text-center p-5 bg-pink-500/5 rounded-2xl border border-pink-500/10">
                    <p className="text-3xl font-black text-pink-500 mb-1">8-12</p>
                    <p className="text-sm text-muted-foreground font-medium">Rep Range</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-primary" />
                    Strength Training
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Compound lifts (Squat, Deadlift, Bench)",
                      "Progressive overload principle",
                      "3-4 sets of 6-8 reps for strength",
                      "Proper form over heavy weight"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-accent" />
                    Cardio & Conditioning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      goal === 'lose' ? '30-45 min moderate cardio 4x/week' :
                       goal === 'gain' ? '15-20 min light cardio 2x/week' :
                       '25-30 min moderate cardio 3x/week',
                      "HIIT sessions for fat burning",
                      "Active recovery on rest days",
                      "Track heart rate zones"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Weekly Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            {Object.entries(weeklySchedule).map(([day, details]) => (
              <Card key={day} className="glass hover-lift overflow-hidden">
                <div className="flex items-stretch">
                  <div className="w-2 bg-gradient-to-b from-primary to-accent" />
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg capitalize text-foreground">{day}</h3>
                        <p className="text-primary font-medium">{details.focus}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {details.duration}
                        </div>
                        <Badge 
                          className={`${
                            details.intensity >= 80 ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                            details.intensity >= 60 ? 'bg-primary/10 text-primary border-primary/20' :
                            'bg-muted text-muted-foreground'
                          }`}
                        >
                          {details.intensity}% intensity
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{details.workout}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="glass border-accent/30 bg-accent/5 overflow-hidden">
              <div className="flex items-stretch">
                <div className="w-2 bg-gradient-to-b from-accent to-pink-500" />
                <div className="flex-1 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-foreground">Weekend</h3>
                    <Badge className="bg-accent/10 text-accent border-accent/20">Rest & Recovery</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Essential for muscle growth and preventing burnout. Light walking, stretching, foam rolling, 
                    or recreational activities. Prioritize sleep and proper nutrition.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
