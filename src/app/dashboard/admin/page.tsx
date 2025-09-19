"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { Users, University, UserPlus, Activity } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


const stats = [
    { title: "Total Users", value: "1,254", icon: <Users className="h-6 w-6 text-muted-foreground" />, change: "+20.1% from last month" },
    { title: "Total Classes", value: "89", icon: <University className="h-6 w-6 text-muted-foreground" />, change: "+2 from last semester" },
    { title: "New Registrations", value: "+180", icon: <UserPlus className="h-6 w-6 text-muted-foreground" />, change: "this month" },
    { title: "Platform Activity", value: "High", icon: <Activity className="h-6 w-6 text-muted-foreground" />, change: "based on recent logins" },
];

const initialData = [
  { name: "Jan", total: 0 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 0 },
  { name: "Apr", total: 0 },
  { name: "May", total: 0 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 0 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 0 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
];

export default function AdminDashboard() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData.map(item => ({
      ...item,
      total: Math.floor(Math.random() * 5000) + 1000,
    })));
  }, []);

  return (
    <>
      <PageHeader title="Admin Dashboard" description="High-level platform overview and metrics." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
             <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
            </Card>
        ))}
      </div>
      <div className="mt-6">
        <Card>
            <CardHeader>
                <CardTitle>Registrations Overview</CardTitle>
                <CardDescription>A chart showing new user registrations this year.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        />
                        <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                        />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
