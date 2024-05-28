import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// Types

// Event type
/*
Event // table: events
    id: number
    created_at: string
    name: string
    date: string
    description: string
    venue_id: number // foreign key to Venue
    comments?: Comment[] // available if .select('*,comments(*)') was done
*/

// Comment type
/*
Comment // table: comments
    id: number
    created_at: string
    content: string
    event_id: number // foreign key to Event
*/

// Venue type
/*
Venue // table: venues
    id: number
    name: string
    location: string
    description: string
    created_at: string
    updated_at: string
    events?: Event[] // available if .select('*,events(*)') was done
*/

// Hooks

// Fetch all events with related venue
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*,venue(*)')),
});

// Fetch all comments
export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});

// Fetch all venues with related events
export const useVenues = () => useQuery({
    queryKey: ['venues'],
    queryFn: () => fromSupabase(supabase.from('venues').select('*,events(*)')),
});

// Add a new event
export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Add a new comment
export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

// Add a new venue
export const useAddVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newVenue) => fromSupabase(supabase.from('venues').insert([newVenue])),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};