import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight, User2 } from "lucide-react";

const StatCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <User2 />
          <span>Users</span>
        </CardTitle>
        <CardDescription>Number of Users</CardDescription>
        <CardAction>
          <span className="text-sm text-green-500 border bg-green-500/10 px-2 py-1 rounded">
            +10%
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tracking-wider">5000</p>
      </CardContent>
      <CardFooter>
        <p className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
          <span className="text-sm">View Users</span> <ArrowRight size={18} />
        </p>
      </CardFooter>
    </Card>
  );
};

export default StatCard;
