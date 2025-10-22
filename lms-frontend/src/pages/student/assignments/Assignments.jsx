import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Calendar, BookOpen, Upload } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import StatsCard from "@/components/dashboard/StatsCard";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/assignments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAssignments(res.data.data || res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch assignments");
      }
    };

    fetchAssignments();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Submitted":
        return <Badge className="bg-green-500">Submitted</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "Overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmitFile = async () => {
    if (!file) {
      toast.warning("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:4000/api/assignments/${selectedAssignment._id}/submit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Assignment submitted successfully!");
      setFile(null);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload assignment");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="space-y-6">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Assignments</h1>
        <p className="text-gray-500">
          Track and manage your course assignments
        </p>
      </div>
      <StatsCard page="assignments" role="student" />

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignments && assignments.length > 0 ? (
          assignments.map((assignment) => (
            <Card
              key={assignment._id}
              className="p-5 hover:shadow-md transition-all duration-300 border rounded-xl"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{assignment.title}</h3>
                {getStatusBadge(assignment.status)}
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {assignment.description}
              </p>

              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} /> {assignment.courseTitle}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> Due:{" "}
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> Created:{" "}
                  {new Date(assignment.createdAt).toLocaleDateString()}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-[#4b0082] text-[#4b0082] hover:bg-[#4b00821a]"
                onClick={() => {
                  setSelectedAssignment(assignment);
                  setOpen(true);
                }}
              >
                <FileText size={16} className="mr-2" /> View Details
              </Button>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-10">
            No assignments found.
          </p>
        )}
      </div>

      {/* Assignment Detail Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          {selectedAssignment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAssignment.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm text-gray-600">
                <p>{selectedAssignment.description}</p>

                <div className="space-y-2">
                  <p>
                    <strong>Course:</strong> {selectedAssignment.courseTitle}
                  </p>
                  <p>
                    <strong>Due Date:</strong>{" "}
                    {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedAssignment.status}
                  </p>
                </div>

                {selectedAssignment.file && (
                  <Button
                    onClick={() =>
                      window.open(selectedAssignment.file, "_blank")
                    }
                    className="bg-[#4b0082] text-white w-full hover:bg-[#4b0082c7]"
                  >
                    <FileText size={16} className="mr-2" /> View Assignment File
                  </Button>
                )}

                {/* Upload Section */}
                <div className="pt-4 border-t mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Submit Your Assignment
                  </h4>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full text-sm border p-2 rounded mb-3"
                  />
                  <Button
                    onClick={handleSubmitFile}
                    disabled={uploading}
                    className="w-full bg-[#4b0082] text-white hover:bg-[#4b0082d5]"
                  >
                    <Upload size={16} className="mr-2" />
                    {uploading ? "Uploading..." : "Upload File"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Assignments;
