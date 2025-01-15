"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

interface Message {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string; // Added phone
  message: string; // Added message
  created_at: string;
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("id, firstname, lastname, email, phone, message, created_at")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching messages:", error);
          setError("Failed to fetch messages.");
        } else {
          setMessages(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred while fetching messages.");
      }
    };

    fetchMessages();
  }, []);

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div className="mt-20 p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <h3 className="text-2xl text-center font-bold mb-6 text-white">All Messages</h3>

      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-bold text-black border-b">First Name</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-black border-b">Last Name</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-black border-b">Date</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-black border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id} className="cursor-pointer hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{message.firstname}</td>
                <td className="px-6 py-4 border-b">{message.lastname}</td>
                <td className="px-6 py-4 border-b">
                  {new Date(message.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 border-b">
                  <button
                    onClick={() => handleViewMessage(message)}
                    className="px-4 py-2 text-dusty rounded-md hover:text-blue-200"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for message details */}
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-md w-full text-black">
            <h3 className="text-xl font-bold mb-4">Message Details</h3>
            <p>
              <strong>First Name:</strong> {selectedMessage.firstname}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedMessage.lastname}
            </p>
            <p>
              <strong>Email:</strong> {selectedMessage.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedMessage.phone}
            </p>
            <p>
              <strong>Message:</strong> {selectedMessage.message}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedMessage.created_at).toLocaleString()}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
