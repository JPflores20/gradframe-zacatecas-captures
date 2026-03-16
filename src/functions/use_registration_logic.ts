import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GradframeEvent } from "@/types/gradframe_event";
import { fetch_event_by_code, create_new_registration } from "@/functions/database";
import { ERROR_MISSING_FIELDS, ERROR_SUBMITTING_REGISTRATION, SUCCESS_REGISTRATION, SUCCESS_REGISTRATION_DESC } from "@/utils/constants";

export const use_registration_logic = () => {
  const { code } = useParams<{ code: string }>();
  const navigation_hook = useNavigate();
  
  const [target_event, set_target_event] = useState<GradframeEvent | null>(null);
  const [is_loading_event, set_is_loading_event] = useState(true);
  const [is_submitting, set_is_submitting] = useState(false);

  const [student_name, set_student_name] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [student_height, set_student_height] = useState("");
  const [photo_package, set_photo_package] = useState("");
  const [needs_stole_and_cap, set_needs_stole_and_cap] = useState(false);
  const [needs_custom_stole, set_needs_custom_stole] = useState(false);
  const [custom_stole_text, set_custom_stole_text] = useState("");
  const [frame_style, set_frame_style] = useState("");

  useEffect(() => {
    const fetch_event_data = async () => {
      if (!code) {
        navigation_hook("/ingresar-codigo");
        return;
      }

      const query_code = code.toUpperCase();
      const event_data = await fetch_event_by_code(query_code);

      if (event_data === null) {
        toast.error("El evento no existe.");
        navigation_hook("/ingresar-codigo");
      } else {
        set_target_event(event_data);
      }
      
      set_is_loading_event(false);
    };

    fetch_event_data();
  }, [code, navigation_hook]);

  const handle_form_submit = async (event_submit: React.FormEvent) => {
    event_submit.preventDefault();
    
    if (target_event === null || !target_event.id) {
      return;
    }
    
    if (!student_name || !phone_number || !student_height || !photo_package || !frame_style) {
      toast.error(ERROR_MISSING_FIELDS);
      return;
    }

    set_is_submitting(true);
    
    let final_custom_stole_text = "No requerida";
    if (needs_custom_stole) {
      final_custom_stole_text = custom_stole_text;
    }

    const registration_payload = {
      event_id: target_event.id,
      user_id: "dummy_user_id",
      name: student_name,
      phone_number: phone_number,
      height: student_height,
      photo_package: photo_package,
      stole_and_cap: needs_stole_and_cap,
      custom_stole: final_custom_stole_text,
      frame_style: frame_style,
    };

    const is_success = await create_new_registration(registration_payload);

    if (is_success) {
      toast.success(SUCCESS_REGISTRATION, {
        description: SUCCESS_REGISTRATION_DESC,
        duration: 8000
      });
      navigation_hook("/");
    } else {
      toast.error(ERROR_SUBMITTING_REGISTRATION);
    }
    
    set_is_submitting(false);
  };

  return {
    target_event,
    is_loading_event,
    is_submitting,
    form_state: {
      student_name,
      set_student_name,
      phone_number,
      set_phone_number,
      student_height,
      set_student_height,
      photo_package,
      set_photo_package,
      needs_stole_and_cap,
      set_needs_stole_and_cap,
      needs_custom_stole,
      set_needs_custom_stole,
      custom_stole_text,
      set_custom_stole_text,
      frame_style,
      set_frame_style
    },
    navigation_hook,
    handle_form_submit
  };
};
