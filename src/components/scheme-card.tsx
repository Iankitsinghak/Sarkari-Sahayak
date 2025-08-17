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
import { motion } from 'framer-motion';

interface SchemeCardProps {
  scheme: Scheme;
  isBookmarked: boolean;
  applicationStatus: ApplicationStatus;
  onToggleBookmark: (schemeName: string) => void;
  onUpdateStatus: (schemeName: string, status: ApplicationStatus) => void;
}

const statusColors: Record<ApplicationStatus, string> = {
  'Not Applied': 'bg-gray-200 text-gray-700',
  'Applied': 'bg-blue-100 text-blue-700',
  'Approved': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
};

export default function SchemeCard({
  scheme,
  isBookmarked,
  applicationStatus,
  onToggleBookmark,
  onUpdateStatus,
}: SchemeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <Card className="flex flex-col rounded-2xl shadow-md border border-gray-100 bg-white">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <Badge
                variant="secondary"
                className="mb-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-md"
              >
                {scheme.category}
              </Badge>
              <CardTitle className="font-headline text-xl bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                {scheme.name}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleBookmark(scheme.name)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark scheme'}
              className="hover:text-green-500 transition"
            >
              <Bookmark
                className={cn(
                  'h-5 w-5',
                  isBookmarked && 'fill-green-500 text-green-500'
                )}
              />
            </Button>
          </div>

          {scheme.summary && (
            <CardDescription className="pt-2 text-gray-600">
              {scheme.summary}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="flex-grow">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-blue-600">
                View Details
              </AccordionTrigger>
              <AccordionContent className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold mb-1 text-gray-900">Benefits</h4>
                  <p>{scheme.benefits}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-gray-900">
                    Eligibility
                  </h4>
                  <p>{scheme.eligibility}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-gray-900">
                    Required Documents
                  </h4>
                  <p>{scheme.requiredDocuments}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>

        <CardFooter className="flex-col items-start gap-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'px-2 py-1 text-xs rounded-full font-medium',
                  statusColors[applicationStatus]
                )}
              >
                {applicationStatus}
              </span>
              <Select
                value={applicationStatus}
                onValueChange={(value: ApplicationStatus) =>
                  onUpdateStatus(scheme.name, value)
                }
              >
                <SelectTrigger className="h-8 text-xs w-[130px]">
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
            <Button
              asChild
              size="sm"
              className="bg-green-500 text-white hover:bg-green-600 transition rounded-full px-4"
            >
              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Link <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
