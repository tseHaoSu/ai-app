import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from './button';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   message: {
      id: string;
      message: string;
   };
};

type Message = {
   content: string;
   role: 'user' | 'bot';
};

const Chatbot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = async ({ prompt }: FormData) => {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      reset();

      try {
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         console.log(data.message);

         setMessages((prev) => [
            ...prev,
            { content: data.message.message, role: 'bot' },
         ]);
      } catch (error) {
         console.error('Error sending message:', error);
      }
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   const isButtonDisabled = !formState.isValid;

   return (
      <div>
         <div>
            {messages.map((message, index) => (
               <p key={index} className="px-4 py-2">
                  {message.content}
               </p>
            ))}
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}
            className="flex flex-col gap-2 w-full border-2 p-4 rounded-3xl bg-white"
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (value) => value.trim().length > 0,
               })}
               className="border-0 rounded-3xl w-full focus:outline-0 resize-none p-3 text-base"
               placeholder="Ask me..."
               maxLength={1000}
            />
            <Button
               type="submit"
               className="rounded-full w-9 h-9 p-0 self-end"
               disabled={isButtonDisabled}
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default Chatbot;
