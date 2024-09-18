"use client";

import React, { useState } from 'react';
import { AlertCircle, Home, Hotel, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion } from 'framer-motion';

const questions = [
  {
    id: 'q1',
    text: 'In the last year, because you had no other choice, did you ever:',
    options: [
      { value: '3', label: 'Sleep on the street' },
      { value: '2', label: 'Sleep in emergency housing (e.g., shelter, crisis bed)' },
      { value: '1', label: 'Sleep at an acquaintance\'s place' },
      { value: '0', label: 'None of the above' },
    ],
  },
  {
    id: 'q2',
    text: 'In the next year, do you think it\'s possible that you\'ll have to sleep on the street, in emergency housing, or at an acquaintance\'s place due to lack of other options?',
    options: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
  },
  {
    id: 'q3',
    text: 'In your current situation, can you afford to pay rent each month and related expenses (electricity, heating, household products, etc.)? If not, can you organize yourself to do so?',
    options: [
      { value: '0', label: 'Yes, I can currently afford to pay rent and related expenses' },
      { value: '1', label: 'No, but I can organize myself to do so' },
      { value: '2', label: 'No, and I can\'t organize myself to do so' },
    ],
  },
  {
    id: 'q4',
    text: 'Are there people in your circle who can help you if needed? If not, do you know where to go for help?',
    options: [
      { value: '0', label: 'Yes, I know people who can help me if needed' },
      { value: '1', label: 'No one can help me, but I know where to find help' },
      { value: '2', label: 'No one can help me, and I don\'t know where to find help' },
    ],
  },
  {
    id: 'q5',
    text: 'Do you have a safe place to sleep tonight? If not, can you find a safe place to sleep tonight?',
    options: [
      { value: '0', label: 'Yes, I have a safe place to sleep tonight' },
      { value: '1', label: 'No, but I can find a safe place' },
      { value: '3', label: 'No, and I can\'t find a safe place' },
    ],
  },
  {
    id: 'q6',
    text: 'Can you stay in this place for as long as you want? If not, can you find another place?',
    options: [
      { value: '0', label: 'Yes, I can stay as long as I want' },
      { value: '1', label: 'No, but I have another place to sleep if I leave' },
      { value: '2', label: 'No, and I have no other place to sleep if I leave' },
    ],
  },
];

const getResultColor = (score: number) => {
  if (score >= 7) return 'bg-red-50 border-red-200 text-red-700';
  if (score >= 5) return 'bg-orange-50 border-orange-200 text-orange-700';
  if (score >= 3) return 'bg-yellow-50 border-yellow-200 text-yellow-700';
  return 'bg-green-50 border-green-200 text-green-700';
};

const getResultText = (score: number) => {
  if (score >= 7) return 'RED: The situation requires rapid intervention and in-depth exploration.';
  if (score >= 5) return 'ORANGE: It is necessary to explore the person\'s situation in more depth to better understand the risk and implement necessary interventions.';
  if (score >= 3) return 'YELLOW: Some elements seem to indicate that residential stability could be fragile. It is prudent to maintain a link with the person to see how their situation evolves in the medium term (6 months).';
  return 'GREEN: This means that the person has a stable and secure residential situation, has a support network and resources, and is able to bear the costs associated with rent. It is not necessary to further explore residential instability.';
};

export default function HomelessnessAssessmentForm() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const score = Object.values(answers).reduce((sum: number, value) => sum + (value as number), 0);
    setResult(score);
  };

  return (
    <div className="container mx-auto p-8 max-w-3xl space-y-8">
      <Card className="shadow-lg border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gray-100 rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center text-gray-800">CREMIS Assessment Form</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((question) => (
              <div key={question.id} className="bg-white p-6 rounded-lg shadow-md">
                <Label className="text-xl font-semibold mb-4 text-gray-700 block">{question.text}</Label>
                <RadioGroup onValueChange={(value) => handleChange(question.id, value)} className="space-y-2">
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} className="w-5 h-5" />
                      <Label htmlFor={`${question.id}-${option.value}`} className="text-lg text-gray-600 cursor-pointer flex items-center">
                        {option.label === 'Sleep on the street' && <Home className="mr-2 h-5 w-5" />}
                        {option.label === 'Sleep in emergency housing (e.g., shelter, crisis bed)' && <Hotel className="mr-2 h-5 w-5" />}
                        {option.label === 'Sleep at an acquaintance\'s place' && <Users className="mr-2 h-5 w-5" />}
                        {option.label === 'None of the above' && <CheckCircle className="mr-2 h-5 w-5" />}
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <Button type="submit" className="w-full text-lg py-6 bg-zinc-900 -600 hover:bg-blue-700 transition-colors">
              Submit Assessment
            </Button>
          </form>
        </CardContent>
      </Card>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={`shadow-lg ${getResultColor(result)} border-2`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <AlertCircle className="mr-3 h-6 w-6" />
                Assessment Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl leading-relaxed">{getResultText(result)}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}