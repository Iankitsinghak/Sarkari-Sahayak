'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bookmark, ExternalLink } from 'lucide-react';
import type { Scheme, ApplicationStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SchemeCardProps {
  scheme: Scheme;
  isBookmarked: boolean;
  applicationStatus: ApplicationStatus;
  onToggleBookmark: (schemeName: string) => void;
  onUpdateStatus: (schemeName: string, status: ApplicationStatus) => void;
}

const statusColors: Record<ApplicationStatus, string> = {
  'Not Applied': 'bg-gray-500',
  'Applied': 'bg-blue-500',
  'Approved': 'bg-green-500',
  'Rejected': 'bg-red-500',
};

export default function SchemeCard({
  scheme,
  isBookmarked,
  applicationStatus,
  onToggleBookmark,
  onUpdateStatus,
}: SchemeCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <Badge variant="secondary" className="mb-2">{scheme.category}</Badge>
                <CardTitle className="font-headline text-xl">{scheme.name}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleBookmark(scheme.name)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark scheme'}
            >
              <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-primary text-primary')} />
            </Button>
        </div>
        
        {scheme.summary && (
            <CardDescription className="pt-2">{scheme.summary}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details">
            <AccordionTrigger>View Details</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">Benefits</h4>
                <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Eligibility</h4>
                <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Required Documents</h4>
                <p className="text-sm text-muted-foreground">{scheme.requiredDocuments}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <div className="flex w-full items-center justify-between">
            <div className='flex items-center gap-2'>
            <span className={cn('h-3 w-3 rounded-full', statusColors[applicationStatus])} />
            <Select
                value={applicationStatus}
                onValueChange={(value: ApplicationStatus) => onUpdateStatus(scheme.name, value)}
            >
                <SelectTrigger className="h-8 text-xs w-[120px]">
                <SelectValue>{applicationStatus}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="Not Applied">Not Applied</SelectItem>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>
            </div>
            <Button asChild size="sm" variant="outline">
                <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer">
                    Official Link <ExternalLink className="ml-2 h-4 w-4" />
                </a>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
