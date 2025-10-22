import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/dashboard/Header";

const AssignmentDetail = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  //Fetch assignment details
  const fetchAssignment = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:4000/api/assignments/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAssignment(res.data.data);
    } catch (error) {
      toast.error("Failed to load assignment details", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  // 🔹 Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 🔹 Handle file submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.warning("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:4000/api/assignments/${id}/submit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("File uploaded successfully!");
      setFile(null);

      // Refresh assignment to show new attachment
      fetchAssignment();
    } catch (error) {
      toast.error("Failed to upload file", error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!assignment)
    return (
      <p className="text-center mt-10 text-gray-500">Assignment not found</p>
    );

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <h1 className="text-3xl font-semibold mb-4">{assignment.title}</h1>

        <p className="text-gray-600 mb-2">
          <span className="font-medium">Course:</span>{" "}
          {assignment.courseId?.title || "N/A"}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Due Date:</span>{" "}
          {new Date(assignment.dueDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-6">{assignment.description}</p>

        {/* 🔹 Show previously uploaded files */}
        {assignment.attachments?.length > 0 && (
          <Card className="p-4 mb-6 border rounded-xl">
            <h3 className="text-lg font-medium mb-3">Submitted Files</h3>
            <ul className="space-y-2">
              {assignment.attachments.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <span>{file.name}</span>
                  <a
                    href={`http://localhost:4000${file.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* 🔹 File Upload Section */}
        <Card className="p-4 border rounded-xl">
          <h3 className="text-lg font-medium mb-3">Submit Your Work</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="file"
              onChange={handleFileChange}
              className="border rounded p-2"
            />
            <Button
              type="submit"
              disabled={uploading}
              className="bg-[#4b0082] text-white hover:bg-[#4b0082d5]"
            >
              {uploading ? "Uploading..." : "Submit Assignment"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AssignmentDetail;
