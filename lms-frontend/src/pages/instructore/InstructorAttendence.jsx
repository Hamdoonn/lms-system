import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Loader2, UserCheck, Users, CalendarDays, Save, RefreshCcw, Eye } from "lucide-react"

export default function InstructorAttendence() {
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState("")
  const [course, setCourse] = useState("")
  const [section, setSection] = useState("")
  const [students, setStudents] = useState([])
  const [instructorStatus, setInstructorStatus] = useState("present")

  // Dummy data
  const dummyStudents = [
    { id: 1, roll: "BSCS-001", name: "Ali Khan", status: "present", remarks: "" },
    { id: 2, roll: "BSCS-002", name: "Sara Ahmed", status: "absent", remarks: "" },
    { id: 3, roll: "BSCS-003", name: "Bilal Hussain", status: "late", remarks: "" },
    { id: 4, roll: "BSCS-004", name: " Hussain ali", status: "leave", remarks: "" },
  ]

  const handleLoadStudents = () => {
    setLoading(true)
    setTimeout(() => {
      setStudents(dummyStudents)
      setLoading(false)
    }, 1000)
  }

  const handleMarkAll = (status) => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })))
  }

  const handleSave = () => {
    console.log("Saving attendance:", { course, section, date, instructorStatus, students })
    /* 
      🔧 BACKEND INTEGRATION:
      1. Replace console.log with axios/fetch POST call.
      2. Endpoint example: POST /api/instructor/attendance
      3. Send JSON:
         {
           course, section, date,
           instructorStatus,
           students: [{id, status, remarks}]
         }
    */
    alert("✅ Attendance saved successfully (dummy action)")
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen text-gray-900">
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-[#562C78] flex items-center gap-2">
            <UserCheck className="w-6 h-6" /> Attendance Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-end mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Course</label>
              <Select onValueChange={setCourse}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="ai">AI Fundamentals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Section</label>
              <Select onValueChange={setSection}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3A">BSCS-3A</SelectItem>
                  <SelectItem value="4B">BSCS-4B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <Input
                type="date"
                className="w-44"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <Button
              onClick={handleLoadStudents}
              className="bg-[#562C78] hover:bg-[#452163] text-white"
            >
              <CalendarDays className="w-4 h-4 mr-2" /> Load Students
            </Button>
          </div>

          {/* Instructor Attendance */}
          <div className="mb-6 bg-gray-50 rounded-xl p-4">
            <h3 className="text-md font-semibold mb-2 text-[#562C78]">
              Instructor Attendance
            </h3>
            <div className="flex gap-4">
              {["present", "absent", "leave"].map((status) => (
                <Button
                  key={status}
                  variant={instructorStatus === status ? "default" : "outline"}
                  className={`capitalize ${
                    instructorStatus === status
                      ? "bg-[#562C78] text-white"
                      : "border-[#562C78] text-[#562C78]"
                  }`}
                  onClick={() => setInstructorStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Tabs for Students / Previous Records */}
          <Tabs defaultValue="mark">
            <TabsList className="bg-gray-100 p-1 rounded-md">
              <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
              <TabsTrigger value="records">Previous Records</TabsTrigger>
            </TabsList>

            {/* --- MARK ATTENDANCE TAB --- */}
            <TabsContent value="mark" className="mt-4">
              {loading ? (
                <div className="flex items-center justify-center py-10 text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Loading Students...
                </div>
              ) : students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-[#562C78] text-white">
                      <tr>
                        <th className="p-2 text-left">Roll No</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-center">Status</th>
                        <th className="p-2 text-left">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => (
                        <tr key={s.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">{s.roll}</td>
                          <td className="p-2">{s.name}</td>
                          <td className="p-2 text-center">
                            <Select
                              value={s.status}
                              onValueChange={(value) =>
                                setStudents((prev) =>
                                  prev.map((st) =>
                                    st.id === s.id ? { ...st, status: value } : st
                                  )
                                )
                              }
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="present">✅ Present</SelectItem>
                                <SelectItem value="absent">❌ Absent</SelectItem>
                                <SelectItem value="late">🕓 Late</SelectItem>
                                <SelectItem value="leave">💤 Leave</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2">
                            <Input
                              placeholder="Remarks"
                              value={s.remarks}
                              onChange={(e) =>
                                setStudents((prev) =>
                                  prev.map((st) =>
                                    st.id === s.id
                                      ? { ...st, remarks: e.target.value }
                                      : st
                                  )
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Bulk Buttons */}
                  <div className="flex justify-between mt-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-[#562C78] text-[#562C78]"
                        onClick={() => handleMarkAll("present")}
                      >
                        <Users className="w-4 h-4 mr-2" /> Mark All Present
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#562C78] text-[#562C78]"
                        onClick={() => handleMarkAll("absent")}
                      >
                        <RefreshCcw className="w-4 h-4 mr-2" /> Mark All Absent
                      </Button>
                    </div>
                    <Button
                      className="bg-[#562C78] hover:bg-[#452163] text-white"
                      onClick={handleSave}
                    >
                      <Save className="w-4 h-4 mr-2" /> Save Attendance
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No students loaded yet. Select course, section, and date.
                </div>
              )}
            </TabsContent>

            {/* --- PREVIOUS RECORDS TAB --- */}
            <TabsContent value="records" className="mt-4">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-[#562C78] text-white">
                  <tr>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Course</th>
                    <th className="p-2 text-left">Present</th>
                    <th className="p-2 text-left">Absent</th>
                    <th className="p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">2025-10-08</td>
                    <td className="p-2">Web Development</td>
                    <td className="p-2">22</td>
                    <td className="p-2">3</td>
                    <td className="p-2 text-center">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" /> View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
