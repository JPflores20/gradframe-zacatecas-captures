import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GradframeEvent } from "@/types/gradframe_event";
import { FIREBASE_COLLECTION_EVENTS } from "@/utils/constants";

export const use_events_snapshot = () => {
  const [events_list, set_events_list] = useState<GradframeEvent[]>([]);
  const [is_loading_events, set_is_loading_events] = useState(true);

  useEffect(() => {
    const database_query = query(collection(db, FIREBASE_COLLECTION_EVENTS), orderBy("date", "asc"));
    
    const unsubscribe_listener = onSnapshot(database_query, (snapshot) => {
      const parsed_events = snapshot.docs.map(document => {
        const data = document.data() as GradframeEvent;
        return {
          id: document.id,
          ...data
        };
      });
      
      set_events_list(parsed_events);
      set_is_loading_events(false);
    }, (error) => {
      console.error("Error fetching events:", error);
      set_is_loading_events(false);
    });

    return () => unsubscribe_listener();
  }, []);

  return { events_list, is_loading_events };
};
