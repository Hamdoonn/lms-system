// src/components/AddCourse.jsx
// Advanced AddCourse component (frontend-only, Vite + React + Tailwind).
// Theme primary color: #562c78
//
// Notes:
// - This component uses local state & localStorage to simulate saving courses.
// - File "uploads" are preview-only using URL.createObjectURL; replace with real upload API when backend is ready.
// - You can replace inputs with shadcn/ui inputs/buttons by swapping markup and props.

import React, { useEffect, useState, useMemo } from "react";
import { PlusCircle, Trash2, Eye, UploadCloud } from "lucide-react";

/* ---------------------------
  Helper utilities
----------------------------*/
const PRIMARY = "#562c78";
const LOCAL_STORAGE_KEY = "lms_dummy_courses_v1";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function formatDateInputValue(date) {
  if (!date) return "";
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function calcDurationWeeks(start, end) {
  if (!start || !end) return "";
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s) || isNaN(e) || e < s) return "";
  const days = Math.round((e - s) / (1000 * 60 * 60 * 24));
  const weeks = (days / 7).toFixed(1);
  return `${weeks} wk (${days} days)`;
}

/* ---------------------------
  Dummy default course structure to prefill the form
----------------------------*/
const DEFAULT_DUMMY_COURSE = {
  title: "React Fundamentals",
  code: "REACT101",
  category: "Programming",
  level: "Beginner",
  language: "English",
  shortDescription: "Learn the core concepts of React and build real-world components.",
  longDescription:
    "This course covers React fundamentals including components, state, props, hooks and project structure. Build multiple small projects and a final capstone app.",
  tags: ["react", "frontend", "javascript"],
  startDate: formatDateInputValue(new Date()),
  endDate: formatDateInputValue(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 6)), // +6 weeks
  maxStudents: 50,
  price: 0,
  modules: [
    {
      id: uid(),
      title: "Introduction",
      lessons: [
        { id: uid(), title: "What is React?", type: "theory", media: null },
        { id: uid(), title: "Project Setup", type: "demo", media: null },
      ],
    },
    {
      id: uid(),
      title: "Components & Props",
      lessons: [{ id: uid(), title: "Functional Components", type: "theory", media: null }],
    },
  ],
  outcomes: ["Understand components", "Use hooks", "Build simple apps"],
  thumbnail: null,
  introVideo: null,
  status: "draft", // or 'published'
};

/* ---------------------------
  Component
----------------------------*/
export default function AddCourse() {
  // Form state
  const [course, setCourse] = useState(() => ({
    ...DEFAULT_DUMMY_COURSE,
    title: "",
    code: "",
    shortDescription: "",
    longDescription: "",
    tags: [],
    modules: [],
    outcomes: [],
    startDate: "",
    endDate: "",
    thumbnail: null,
    introVideo: null,
    maxStudents: "",
    price: "",
    status: "draft",
  }));

  // UI state
  const [tagInput, setTagInput] = useState("");
  const [outcomeInput, setOutcomeInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [savedCourses, setSavedCourses] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Derived
  const durationDisplay = useMemo(
    () => calcDurationWeeks(course.startDate, course.endDate),
    [course.startDate, course.endDate]
  );

  // Effects: auto-clear toast after 3s
  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(t);
  }, [toastMessage]);

  /* ---------------------------
     Validation
  ----------------------------*/
  const validate = () => {
    const e = {};
    if (!course.title || course.title.trim().length < 3) e.title = "Course title is required (min 3 chars).";
    if (!course.code || course.code.trim().length < 3) e.code = "Course code is required.";
    if (!course.shortDescription) e.shortDescription = "Short description is required.";
    if (!course.startDate) e.startDate = "Start date required.";
    if (course.endDate && new Date(course.endDate) < new Date(course.startDate))
      e.endDate = "End date must be after start date.";
    // modules optional but if present it must have title
    (course.modules || []).forEach((m, idx) => {
      if (!m.title || m.title.trim() === "") e[`module_${m.id}`] = `Module ${idx + 1} title required.`;
      (m.lessons || []).forEach((ls, li) => {
        if (!ls.title || ls.title.trim() === "") e[`lesson_${ls.id}`] = `Lesson ${li + 1} title required in module ${idx + 1}.`;
      });
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------------------
     Handlers: basic fields
  ----------------------------*/
  function patch(fields) {
    setCourse((c) => ({ ...c, ...fields }));
  }

  function handleTitleChange(v) {
    patch({ title: v, code: casedCourseCode(v, course.code) });
  }

  function casedCourseCode(title, currentCode) {
    // If code empty, auto-generate from title: take words uppercase initials
    if (currentCode && currentCode.trim() !== "") return currentCode;
    if (!title) return "";
    const parts = title.split(/\s+/).slice(0, 3);
    const code = parts.map((p) => p[0]).join("").toUpperCase() + Math.floor(Math.random() * 900 + 100);
    return code;
  }

  /* ---------------------------
     Tags
  ----------------------------*/
  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (course.tags.includes(t)) {
      setTagInput("");
      return;
    }
    patch({ tags: [...course.tags, t] });
    setTagInput("");
  };
  const removeTag = (t) => patch({ tags: course.tags.filter((x) => x !== t) });

  /* ---------------------------
     Outcomes
  ----------------------------*/
  const addOutcome = () => {
    const t = outcomeInput.trim();
    if (!t) return;
    patch({ outcomes: [...course.outcomes, t] });
    setOutcomeInput("");
  };
  const removeOutcome = (idx) => {
    const arr = [...course.outcomes];
    arr.splice(idx, 1);
    patch({ outcomes: arr });
  };

  /* ---------------------------
     Modules & Lessons (dynamic)
  ----------------------------*/
  function addModule() {
    const m = { id: uid(), title: "", lessons: [] };
    patch({ modules: [...(course.modules || []), m] });
  }
  function removeModule(moduleId) {
    patch({ modules: (course.modules || []).filter((m) => m.id !== moduleId) });
  }
  function updateModuleTitle(moduleId, title) {
    patch({ modules: (course.modules || []).map((m) => (m.id === moduleId ? { ...m, title } : m)) });
  }

  function addLesson(moduleId) {
    const lesson = { id: uid(), title: "", type: "theory", media: null };
    patch({
      modules: (course.modules || []).map((m) => (m.id === moduleId ? { ...m, lessons: [...m.lessons, lesson] } : m)),
    });
  }
  function removeLesson(moduleId, lessonId) {
    patch({
      modules: (course.modules || []).map((m) => (m.id === moduleId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) } : m)),
    });
  }
  function updateLesson(moduleId, lessonId, fields) {
    patch({
      modules: (course.modules || []).map((m) =>
        m.id === moduleId ? { ...m, lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...fields } : l)) } : m
      ),
    });
  }

  /* ---------------------------
     File handlers (preview-only)
  ----------------------------*/
  function handleThumbnailChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const preview = { name: f.name, size: f.size, type: f.type, url: URL.createObjectURL(f) };
    patch({ thumbnail: preview });
  }
  function handleIntroVideoChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const preview = { name: f.name, size: f.size, type: f.type, url: URL.createObjectURL(f) };
    patch({ introVideo: preview });
  }
  function clearThumbnail() {
    patch({ thumbnail: null });
  }
  function clearIntroVideo() {
    patch({ introVideo: null });
  }

  /* ---------------------------
     Save (localStorage) and Publish
     Replace these with real API calls later.
  ----------------------------*/
  async function handleSave(as = "draft") {
    patch({ status: as });
    if (!validate()) {
      setToastMessage("Fix validation errors first.");
      return;
    }
    setSaving(true);
    try {
      // Simulate network delay
      await new Promise((res) => setTimeout(res, 600));

      const toSave = {
        id: uid(),
        ...course,
        status: as,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
      existing.unshift(toSave);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
      setSavedCourses(existing);

      setToastMessage(as === "published" ? "Course published!" : "Course saved as draft.");
      // optionally clear form or keep it — we will keep it but reset status
      patch({ status: as });
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to save (local).");
    } finally {
      setSaving(false);
    }
  }

  /* ---------------------------
     Quick helpers for UX
  ----------------------------*/
  function loadDummy() {
    setCourse({
      ...DEFAULT_DUMMY_COURSE,
      // keep thumbnail/intro null for safety
      thumbnail: null,
      introVideo: null,
    });
    setErrors({});
    setToastMessage("Loaded sample course (dummy).");
  }

  function resetForm() {
    setCourse({
      ...DEFAULT_DUMMY_COURSE,
      title: "",
      code: "",
      shortDescription: "",
      longDescription: "",
      tags: [],
      modules: [],
      outcomes: [],
      startDate: "",
      endDate: "",
      thumbnail: null,
      introVideo: null,
      maxStudents: "",
      price: "",
      status: "draft",
    });
    setErrors({});
    setToastMessage("Form reset.");
  }

  /* ---------------------------
     Render
  ----------------------------*/
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>
          Add Course
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDummy}
            className="px-3 py-2 rounded-md border hover:bg-gray-50 transition"
            title="Load a sample/dummy course"
          >
            Load Sample
          </button>
          <button
            onClick={resetForm}
            className="px-3 py-2 rounded-md border hover:bg-gray-50 transition"
            title="Reset form"
          >
            Reset
          </button>
          <button
            onClick={() => handleSave("draft")}
            className="px-3 py-2 rounded-md text-white"
            style={{ backgroundColor: PRIMARY }}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={() => handleSave("published")}
            className="px-4 py-2 rounded-md text-white"
            style={{ backgroundColor: "#3f1e57" }}
            disabled={saving}
          >
            {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Main form */}
        <div className="col-span-2 space-y-6">
          {/* Basic card */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Course Title</label>
                <input
                  type="text"
                  value={course.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., React Fundamentals"
                  className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.title ? "border-red-500" : "border-gray-200"}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block font-medium mb-1">Course Code</label>
                <input
                  type="text"
                  value={course.code}
                  onChange={(e) => patch({ code: e.target.value.toUpperCase() })}
                  placeholder="e.g., REACT101"
                  className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.code ? "border-red-500" : "border-gray-200"}`}
                />
                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block font-medium mb-1">Category</label>
                <select
                  value={course.category}
                  onChange={(e) => patch({ category: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option>Programming</option>
                  <option>Design</option>
                  <option>Data Science</option>
                  <option>Business</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Level</label>
                <select value={course.level} onChange={(e) => patch({ level: e.target.value })} className="w-full border rounded px-3 py-2">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Language</label>
                <select value={course.language} onChange={(e) => patch({ language: e.target.value })} className="w-full border rounded px-3 py-2">
                  <option>English</option>
                  <option>Urdu</option>
                  <option>Arabic</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-medium mb-1">Short Description</label>
              <input
                type="text"
                value={course.shortDescription}
                onChange={(e) => patch({ shortDescription: e.target.value })}
                placeholder="1-2 line summary"
                className={`w-full border rounded px-3 py-2 ${errors.shortDescription ? "border-red-500" : "border-gray-200"}`}
              />
              {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>}
            </div>

            <div className="mt-4">
              <label className="block font-medium mb-1">Detailed Description / Syllabus</label>
              <textarea
                value={course.longDescription}
                onChange={(e) => patch({ longDescription: e.target.value })}
                placeholder="Write a longer syllabus or course description..."
                className="w-full h-32 border rounded px-3 py-2"
              />
            </div>

            {/* Tags & Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block font-medium mb-1">Tags (press Add)</label>
                <div className="flex gap-2">
                  <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="border rounded px-3 py-2 flex-1" placeholder="e.g., react, frontend" />
                  <button onClick={addTag} className="px-3 py-2 rounded text-white" style={{ backgroundColor: PRIMARY }}>
                    Add
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {course.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-2 bg-gray-100 border rounded-full px-3 py-1 text-sm">
                      <span className="capitalize">{t}</span>
                      <button onClick={() => removeTag(t)} className="text-red-500">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Learning Outcomes</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={outcomeInput} onChange={(e) => setOutcomeInput(e.target.value)} className="border rounded px-3 py-2 flex-1" placeholder="e.g., Understand hooks" />
                  <button onClick={addOutcome} className="px-3 py-2 rounded text-white" style={{ backgroundColor: PRIMARY }}>
                    Add
                  </button>
                </div>
                <ol className="list-decimal ml-5 space-y-1">
                  {course.outcomes.map((o, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{o}</span>
                      <button onClick={() => removeOutcome(idx)} className="text-red-500 text-sm">
                        Remove
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Schedule & Settings */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1">Start Date</label>
                <input type="date" value={course.startDate} onChange={(e) => patch({ startDate: e.target.value })} className={`w-full border rounded px-3 py-2 ${errors.startDate ? "border-red-500" : "border-gray-200"}`} />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">End Date</label>
                <input type="date" value={course.endDate} onChange={(e) => patch({ endDate: e.target.value })} className={`w-full border rounded px-3 py-2 ${errors.endDate ? "border-red-500" : "border-gray-200"}`} />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Duration</label>
                <input type="text" value={durationDisplay} readOnly className="w-full border rounded px-3 py-2 bg-gray-50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block font-medium mb-1">Max Students</label>
                <input type="number" value={course.maxStudents} onChange={(e) => patch({ maxStudents: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block font-medium mb-1">Price (PKR)</label>
                <input type="number" value={course.price} onChange={(e) => patch({ price: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block font-medium mb-1">Status</label>
                <select value={course.status} onChange={(e) => patch({ status: e.target.value })} className="w-full border rounded px-3 py-2">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          {/* Modules Editor */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Modules & Lessons</h3>
              <button onClick={addModule} className="inline-flex items-center gap-2 px-3 py-2 rounded text-white" style={{ backgroundColor: PRIMARY }}>
                <PlusCircle size={16} /> Add Module
              </button>
            </div>

            {/* Modules list */}
            <div className="p-6 bg-white rounded-2xl shadow-md max-w-10xl mx-auto w-full overflow-x-auto">
              {(course.modules || []).length === 0 && <p className="text-gray-500">No modules yet. Add modules to create course structure.</p>}
              {(course.modules || []).map((m, mi) => (
                <div key={m.id} className="border rounded-xl p-4 mb-6 bg-white shadow-sm overflow-x-auto">
                  <div className="flex justify-between items-center mb-2">
                    <input
                      type="text"
                      value={m.title}
                      onChange={(e) => updateModuleTitle(m.id, e.target.value)}
                      placeholder={`Module ${mi + 1} title`}
                      className={`w-2/3 border rounded px-3 py-2 ${errors[`module_${m.id}`] ? "border-red-500" : "border-gray-200"}`}
                    />
                    <div className="flex items-center gap-2">
                      <button onClick={() => addLesson(m.id)} className="px-3 py-1 rounded text-white" style={{ backgroundColor: PRIMARY }}>
                        + Lesson
                      </button>
                      <button onClick={() => removeModule(m.id)} className="px-2 py-1 rounded border text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="space-y-2">
                    {m.lessons?.length === 0 && <p className="text-sm text-gray-500">No lessons. Add lessons to this module.</p>}
                    {m.lessons?.map((ls, li) => (
                      <div key={ls.id} className="flex gap-2 items-start">
                        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                          <input type="text" value={ls.title} onChange={(e) => updateLesson(m.id, ls.id, { title: e.target.value })} placeholder={`Lesson ${li + 1} title`} className={`col-span-2 border rounded px-2 py-2 ${errors[`lesson_${ls.id}`] ? "border-red-500" : "border-gray-200"}`} />
                          <select value={ls.type} onChange={(e) => updateLesson(m.id, ls.id, { type: e.target.value })} className="border rounded px-2 py-2">
                            <option value="theory">Theory</option>
                            <option value="demo">Demo</option>
                            <option value="assignment">Assignment</option>
                          </select>
                          <div className="flex gap-2 items-center">
                            <label className="inline-flex items-center gap-2 px-2 py-1 border rounded cursor-pointer">
                              <input type="file" onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                const prev = { name: f.name, url: URL.createObjectURL(f), type: f.type };
                                updateLesson(m.id, ls.id, { media: prev });
                              }} />
                              <span className="text-sm text-gray-600">Upload</span>
                            </label>
                            {ls.media && <span className="text-sm text-gray-500">{ls.media.name}</span>}
                            <button onClick={() => removeLesson(m.id, ls.id)} className="text-red-600"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media uploads (thumbnail, intro video) */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold mb-3">Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Thumbnail (image)</label>
                <div className="flex gap-2 items-center">
                  <input type="file" accept="image/*" onChange={handleThumbnailChange} />
                  {course.thumbnail && (
                    <div className="ml-3 flex items-center gap-2">
                      <img src={course.thumbnail.url} alt="thumb" className="h-16 w-24 object-cover rounded" />
                      <div>
                        <div className="text-sm">{course.thumbnail.name}</div>
                        <button onClick={clearThumbnail} className="text-sm text-red-500">Remove</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Intro Video / File (optional)</label>
                <div className="flex gap-2 items-center">
                  <input type="file" accept="video/*,application/pdf" onChange={handleIntroVideoChange} />
                  {course.introVideo && (
                    <div className="ml-3">
                      <div className="text-sm">{course.introVideo.name}</div>
                      <div className="flex gap-2 mt-1">
                        <button onClick={() => window.open(course.introVideo.url)} className="px-2 py-1 rounded border text-sm">Preview</button>
                        <button onClick={clearIntroVideo} className="px-2 py-1 rounded border text-sm text-red-500">Remove</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons + preview */}
          <div className="flex items-center gap-3">
            <button onClick={() => setShowPreview(true)} className="px-4 py-2 rounded-md border" style={{ borderColor: PRIMARY }}>
              <Eye size={14} className="inline-block mr-2" /> Preview
            </button>
            <button onClick={() => handleSave("draft")} className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: PRIMARY }}>
              Save Draft
            </button>
            <button onClick={() => handleSave("published")} className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: "#3f1e57" }}>
              Publish
            </button>
          </div>
        </div>

        {/* RIGHT: quick meta + saved courses */}
        <aside className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h4 className="font-semibold mb-2">Quick Meta</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div><b>Creator:</b> You (Instructor)</div>
              <div><b>Preview Mode:</b> Frontend-only</div>
              <div><b>Saved Courses:</b> {savedCourses.length}</div>
            </div>
            <div className="mt-4">
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href); setToastMessage("URL copied"); }} className="px-3 py-2 rounded text-white" style={{ backgroundColor: PRIMARY }}>
                Copy Page URL
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <h4 className="font-semibold mb-3">Saved (Local)</h4>
            <div className="space-y-2 max-h-56 overflow-auto">
              {savedCourses.length === 0 && <div className="text-sm text-gray-500">No saved courses yet.</div>}
              {savedCourses.map((c) => (
                <div key={c.id} className="p-2 border rounded hover:bg-gray-50 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{c.title || "(untitled)"}</div>
                    <div className="text-xs text-gray-500">{c.code} • {c.status}</div>
                  </div>
                  <div className="text-sm">
                    <button onClick={() => { setShowPreview(true); setCourse(c); }} className="px-2 py-1 rounded border">Load</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <h4 className="font-semibold mb-2">Notes</h4>
            <div className="text-sm text-gray-600">
              <ul className="list-disc ml-4">
                <li>Currently working with dummy previews for files.</li>
                <li>When backend is ready → replace handleSave with API call + upload endpoints.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-40 flex items-start justify-center p-6 bg-black/40">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-auto max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold" style={{ color: PRIMARY }}>{course.title || "Course Preview"}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => { setShowPreview(false); }} className="px-3 py-1 rounded border">Close</button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                {course.thumbnail ? (
                  <img src={course.thumbnail.url} alt="thumb" className="w-40 h-24 object-cover rounded" />
                ) : (
                  <div className="w-40 h-24 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">No thumbnail</div>
                )}

                <div>
                  <div className="text-sm text-gray-500">{course.code} • {course.category} • {course.level}</div>
                  <h2 className="text-2xl font-bold">{course.title}</h2>
                  <p className="text-gray-700 mt-2">{course.shortDescription}</p>
                  <div className="mt-2 text-sm text-gray-600">Start: {course.startDate || "-"} • End: {course.endDate || "-"} • {durationDisplay}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">What you will learn</h4>
                <ul className="list-disc ml-6 text-gray-700">
                  {course.outcomes.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Syllabus</h4>
                <div className="space-y-3">
                  {course.modules.map((m) => (
                    <div key={m.id} className="border rounded p-3">
                      <div className="font-semibold">{m.title}</div>
                      <ol className="ml-4 list-decimal">
                        {m.lessons.map((ls) => <li key={ls.id}>{ls.title} <span className="text-xs text-gray-500">({ls.type})</span></li>)}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Media</h4>
                <div className="flex gap-4 items-center">
                  {course.introVideo ? (
                    <div>
                      <div className="text-sm">{course.introVideo.name}</div>
                      <div className="mt-2"><button onClick={() => window.open(course.introVideo.url)} className="px-3 py-1 rounded border">Open preview</button></div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">No intro video/file</div>
                  )}
                </div>
              </div>

              <div>
                <button onClick={() => { setShowPreview(false); setToastMessage("Preview closed."); }} className="px-4 py-2 rounded text-white" style={{ backgroundColor: PRIMARY }}>Close Preview</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed right-6 bottom-6 bg-white rounded shadow-md px-4 py-3" style={{ borderLeft: `4px solid ${PRIMARY}` }}>
          <div className="text-sm">{toastMessage}</div>
        </div>
      )}

      {/* Validation hints (developer) */}
      <div className="mt-6 text-xs text-gray-400">
        <div>Developer note: Replace <code>handleSave</code> with real API call to persist course & call real upload endpoints for media. Example endpoints:</div>
        <ul className="list-disc ml-6">
          <li><code>POST /api/courses</code></li>
          <li><code>POST /api/uploads/thumbnail</code> (returns URL)</li>
          <li><code>POST /api/uploads/video</code></li>
        </ul>
      </div>
    </div>
  );
}
