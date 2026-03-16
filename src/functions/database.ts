import { collection, addDoc, Timestamp, query, where, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GradframeEvent } from "@/types/gradframe_event";
import { GradframeRegistration } from "@/types/gradframe_registration";
import { FIREBASE_COLLECTION_EVENTS, FIREBASE_COLLECTION_REGISTRATIONS } from "@/utils/constants";

export const create_new_event = async (event_data: Omit<GradframeEvent, "id" | "created_at">): Promise<boolean> => {
  try {
    const events_ref = collection(db, FIREBASE_COLLECTION_EVENTS);
    
    await addDoc(events_ref, {
      title: event_data.title,
      date: event_data.date,
      time: event_data.time,
      location: event_data.location || "", // <-- Agregamos esto para guardar la ubicación
      details: event_data.details || "",
      unique_code: event_data.unique_code,
      photographer_id: event_data.photographer_id,
      created_at: Timestamp.now(),
    });
    
    return true;
  } catch (error) {
    console.error("Error creating event:", error);
    return false;
  }
};

export const fetch_event_by_code = async (unique_code: string): Promise<GradframeEvent | null> => {
  try {
    const collection_query = query(
      collection(db, FIREBASE_COLLECTION_EVENTS), 
      where("unique_code", "==", unique_code)
    );
    
    const query_snapshot: QuerySnapshot<DocumentData> = await getDocs(collection_query);

    if (query_snapshot.empty) {
      return null;
    }
    
    const event_document = query_snapshot.docs[0];
    const event_data = event_document.data() as GradframeEvent;
    
    event_data.id = event_document.id;
    return event_data;
    
  } catch (error) {
    console.error("Error fetching event by code:", error);
    return null;
  }
};

export const create_new_registration = async (registration_data: Omit<GradframeRegistration, "id" | "created_at">): Promise<boolean> => {
  try {
    const registrations_ref = collection(db, FIREBASE_COLLECTION_REGISTRATIONS);
    
    await addDoc(registrations_ref, {
      event_id: registration_data.event_id,
      user_id: registration_data.user_id,
      name: registration_data.name,
      phone_number: registration_data.phone_number,
      height: registration_data.height,
      photo_package: registration_data.photo_package,
      stole_and_cap: registration_data.stole_and_cap,
      custom_stole: registration_data.custom_stole,
      frame_style: registration_data.frame_style,
      created_at: Timestamp.now(),
    });

    return true;
  } catch (error) {
    console.error("Error submitting registration:", error);
    return false;
  }
};

export const fetch_registrations_by_event = async (event_id: string): Promise<GradframeRegistration[]> => {
  try {
    const collection_query = query(
      collection(db, FIREBASE_COLLECTION_REGISTRATIONS), 
      where("event_id", "==", event_id)
    );
    
    const query_snapshot = await getDocs(collection_query);
    
    return query_snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as GradframeRegistration));
    
  } catch (error) {
    console.error("Error fetching event registrations:", error);
    return [];
  }
};