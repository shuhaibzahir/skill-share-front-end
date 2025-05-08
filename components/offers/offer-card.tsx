"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Offer, Task } from "@/lib/types";
import { DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockUsers } from "@/lib/mock-data";

interface OfferCardProps {
  offer: Offer;
  task?: Task;
  isProvider?: boolean;
  onAccept?: (offerId: string) => void;
  onReject?: (offerId: string) => void;
}

export function OfferCard({ offer, task, isProvider = false, onAccept, onReject }: OfferCardProps) {
  const provider = mockUsers.find(user => user.id === offer.providerId);
  
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'accepted': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            {isProvider ? `Offer for ${task?.name || 'Task'}` : `Offer from ${provider?.name || 'Provider'}`}
          </CardTitle>
          <Badge className={statusColors[offer.status]}>
            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground mb-4">
          {offer.message}
        </div>
        
        <div className="flex justify-between items-center text-sm mb-2">
          <div className="flex items-center gap-1.5 font-medium">
            <DollarSign className="h-4 w-4" />
            <span>{formatCurrency(offer.hourlyRate, 'USD')}/hour</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatDateTime(offer.createdAt)}</span>
          </div>
        </div>
      </CardContent>
      {!isProvider && offer.status === 'pending' && (
        <CardFooter className="grid grid-cols-2 gap-2 pt-2">
          <Button
            onClick={() => onReject && onReject(offer.id)}
            variant="outline"
            className="w-full"
          >
            Reject
          </Button>
          <Button
            onClick={() => onAccept && onAccept(offer.id)}
            className="w-full"
          >
            Accept
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}