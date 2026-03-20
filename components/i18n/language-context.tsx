"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "th";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof typeof translations) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const translations = {
  // ─── เมนู Navbar / Landing Page ───
  "nav.exploreSkillPaths": {
    en: "Explore Skill Paths",
    th: "ค้นหาเส้นทางอัปสกิล",
  },
  "nav.forLearningProviders": {
    en: "For Organizations",
    th: "สำหรับองค์กร",
  },
  "nav.skillPaths": {
    en: "Skill Paths",
    th: "เส้นทางอัปสกิล",
  },
  "nav.learningProgress": {
    en: "Learning Progress",
    th: "ความก้าวหน้าการเรียนรู้",
  },
  "nav.saved": {
    en: "Saved",
    th: "บันทึกไว้",
  },
  "nav.alerts": {
    en: "Alerts",
    th: "การแจ้งเตือน",
  },

  // ─── ปุ่ม CTA / การกระทำ ───
  "action.startLearning": {
    en: "Start Learning",
    th: "เริ่มเรียนรู้เลย",
  },
  "action.startLearningStarting": {
    en: "Starting...",
    th: "กำลังเริ่มเรียนรู้...",
  },
  "action.learningStartedSuccess": {
    en: "Learning started successfully!",
    th: "เริ่มเรียนรู้สำเร็จแล้ว!",
  },
  "action.couldNotStartLearning": {
    en: "Could not start learning.",
    th: "ไม่สามารถเริ่มเรียนรู้ได้",
  },
  "action.completeProfileToStartLearning": {
    en: "Complete your profile to start learning",
    th: "กรุณาเติมโปรไฟล์เพื่อเริ่มเรียนรู้",
  },
  "action.learningProvidersWillSeeFollowing": {
    en: "Organizations will see the following",
    th: "องค์กรจะเห็นข้อมูลต่อไปนี้",
  },
  "action.startLearningOneClick": {
    en: "Start Learning with one click",
    th: "เริ่มเรียนรู้เลยด้วยคลิกเดียว",
  },
  "action.browseAllSkillPaths": {
    en: "Browse all skill paths",
    th: "ดูเส้นทางอัปสกิลทั้งหมด",
  },
  "action.loginSignup": {
    en: "Login / Sign up",
    th: "เข้าสู่ระบบ / สมัคร",
  },
  "action.postLearningProgram": {
    en: "Post a learning program",
    th: "สร้างโปรแกรมเรียน",
  },
  "action.signUpFree": {
    en: "Sign up free",
    th: "สมัครฟรี",
  },
  "action.browseLearningPaths": {
    en: "Browse learning paths",
    th: "ค้นหาเส้นทางการเรียนรู้",
  },
  "action.goToDashboard": {
    en: "Go to dashboard",
    th: "ไปยังแดชบอร์ด",
  },
  "action.learningProviderWorkspace": {
    en: "Organization workspace",
    th: "พื้นที่องค์กร",
  },
  "action.details": {
    en: "Details",
    th: "รายละเอียด",
  },
  "action.search": {
    en: "Search",
    th: "ค้นหา",
  },
  "action.completeProfile": {
    en: "Complete profile",
    th: "กรอกโปรไฟล์ให้ครบ",
  },
  "action.editProfile": {
    en: "Edit profile",
    th: "แก้ไขโปรไฟล์",
  },
  "action.viewLearningPath": {
    en: "View learning path",
    th: "ดูเส้นทางการเรียนรู้",
  },

  // ─── Skill Gap Analysis (โปรไฟล์) ───
  "skillGap.title": {
    en: "Skill Gap Analysis",
    th: "วิเคราะห์ช่องว่างทักษะ",
  },
  "skillGap.description": {
    en: "Mockup for NSC demo: compare your current skills vs market-demand skills.",
    th: "Mockup สำหรับ NSC demo: เปรียบเทียบทักษะที่คุณมี vs ทักษะที่ตลาดต้องการ",
  },
  "skillGap.yourSkill": {
    en: "Your skill",
    th: "ทักษะที่คุณมี",
  },
  "skillGap.marketNeed": {
    en: "Market need",
    th: "ทักษะที่ตลาดต้องการ",
  },
  "skillGap.tip": {
    en: "Tip: Start with the biggest gap and pick a learning path that improves it.",
    th: "คำแนะนำ: เริ่มจาก «ช่องว่าง» ที่มากที่สุด แล้วเลือกเส้นทางการเรียนรู้ที่ช่วยเติมเต็ม",
  },

  // ─── เมนูโปรไฟล์ผู้ใช้ ───
  "profile.editMyProfile": {
    en: "Edit my Profile",
    th: "แก้ไขโปรไฟล์",
  },
  "profile.experience": {
    en: "Experience",
    th: "ประสบการณ์",
  },
  "profile.resume": {
    en: "Resume",
    th: "เรซูเม่",
  },

  // ─── Landing Page: Hero Section ───
  "landing.heroTitle1": {
    en: "Discover & Upskill",
    th: "ค้นพบ & อัปสกิล",
  },
  "landing.heroTitle2": {
    en: "Your Future Career Path",
    th: "เส้นทางอาชีพแห่งอนาคต",
  },
  "landing.heroDescription": {
    en: "Explore learning pathways designed for the future. Reskill, upskill, and grow — all in one platform.",
    th: "สำรวจเส้นทางการเรียนรู้ที่ออกแบบเพื่ออนาคต Reskill, Upskill และเติบโต — ในแพลตฟอร์มเดียว",
  },
  "landing.popular": {
    en: "Popular:",
    th: "ยอดนิยม:",
  },
  "landing.employmentType": {
    en: "Learning Type",
    th: "ประเภทการเรียนรู้",
  },
  "landing.keywordsOrTitle": {
    en: "Keywords or Title",
    th: "คำค้นหาหรือหัวข้อ",
  },
  "landing.keywordsPlaceholder": {
    en: "Design, branding",
    th: "ออกแบบ, แบรนดิ้ง",
  },

  // ─── Landing Page: How It Works ───
  "landing.howItWorks": {
    en: "How it works?",
    th: "ใช้งานอย่างไร?",
  },
  "landing.step1Title": {
    en: "Create Account",
    th: "สร้างบัญชี",
  },
  "landing.step1Desc": {
    en: "It's easy to open an account and start your journey.",
    th: "สร้างบัญชีง่ายๆ แล้วเริ่มต้นเส้นทางของคุณ",
  },
  "landing.step2Title": {
    en: "Complete your profile",
    th: "กรอกโปรไฟล์ให้ครบ",
  },
  "landing.step2Desc": {
    en: "Complete your profile with all the info to get the best recommendations.",
    th: "เติมข้อมูลโปรไฟล์ให้ครบเพื่อรับคำแนะนำที่ดีที่สุด",
  },
  "landing.step3Title": {
    en: "Explore Skill Paths",
    th: "สำรวจเส้นทางอัปสกิล",
  },
  "landing.step3Desc": {
    en: "Discover learning paths that match market needs and your profile.",
    th: "ค้นพบเส้นทางการเรียนรู้ที่ตรงกับความต้องการของตลาดและโปรไฟล์ของคุณ",
  },

  // ─── Landing Page: For Learners Section ───
  "landing.forLearners": {
    en: "For Learners",
    th: "สำหรับผู้เรียน",
  },
  "landing.learnersTitle": {
    en: "Browse learning pathways & build your career",
    th: "สำรวจเส้นทางการเรียนรู้ & สร้างอาชีพของคุณ",
  },
  "landing.learnersDesc": {
    en: "Search thousands of learning paths, save the ones you love, and start learning in minutes. Track your progress from one calm dashboard.",
    th: "ค้นหาเส้นทางการเรียนรู้มากมาย บันทึกสิ่งที่ชอบ แล้วเริ่มเรียนในไม่กี่นาที ติดตามความก้าวหน้าจากแดชบอร์ดเดียว",
  },
  "landing.smartSearch": {
    en: "Smart search & filters",
    th: "ค้นหาและฟิลเตอร์อัจฉริยะ",
  },
  "landing.smartSearchDesc": {
    en: "Filter by topic, difficulty level, learning type, and more.",
    th: "กรองตามหัวข้อ ระดับความยาก ประเภทการเรียนรู้ และอื่นๆ",
  },
  "landing.saveFavorites": {
    en: "Save your favorites",
    th: "บันทึกรายการโปรด",
  },
  "landing.saveFavoritesDesc": {
    en: "Bookmark learning paths and come back to them anytime from your saved list.",
    th: "บุ๊กมาร์กเส้นทางการเรียนรู้แล้วกลับมาดูได้ทุกเมื่อ",
  },
  "landing.oneClickDesc": {
    en: "Enroll in a learning path with an optional note and track your status in real time.",
    th: "ลงทะเบียนเส้นทางการเรียนรู้พร้อมบันทึกย่อ และติดตามสถานะแบบเรียลไทม์",
  },
  "landing.profileResume": {
    en: "Profile & resume",
    th: "โปรไฟล์ & เรซูเม่",
  },
  "landing.profileResumeDesc": {
    en: "Build your profile, upload resumes, and set your open-to-learn status.",
    th: "สร้างโปรไฟล์ อัปโหลดเรซูเม่ และตั้งสถานะพร้อมเรียนรู้",
  },

  // ─── Landing Page: For Learning Providers Section ───
  "landing.forProviders": {
    en: "For Organizations",
    th: "สำหรับองค์กร",
  },
  "landing.providersTitle": {
    en: "Create learning programs & grow your community",
    th: "สร้างโปรแกรมเรียน & ขยายชุมชนขององค์กร",
  },
  "landing.providersDesc": {
    en: "Create your organization workspace, publish programs, review learners, and manage your pipeline as a team.",
    th: "สร้างพื้นที่องค์กร เผยแพร่โปรแกรม ตรวจสอบผู้เรียน และจัดการทีมร่วมกัน",
  },
  "landing.publishManage": {
    en: "Publish & manage programs",
    th: "เผยแพร่ & จัดการโปรแกรม",
  },
  "landing.publishManageDesc": {
    en: "Create learning programs with topics, difficulty, tags, and auto-close settings.",
    th: "สร้างโปรแกรมเรียนพร้อมหัวข้อ ระดับความยาก แท็ก และการปิดอัตโนมัติ",
  },
  "landing.reviewProgress": {
    en: "Review learner progress",
    th: "ตรวจสอบความก้าวหน้าผู้เรียน",
  },
  "landing.reviewProgressDesc": {
    en: "Review submissions, update statuses, and guide learners forward.",
    th: "ตรวจสอบผลงาน อัปเดตสถานะ และแนะนำผู้เรียนไปข้างหน้า",
  },
  "landing.teamAccess": {
    en: "Team & role-based access",
    th: "ทีม & การเข้าถึงตามบทบาท",
  },
  "landing.teamAccessDesc": {
    en: "Invite teammates with admin or coordinator roles to collaborate on programs.",
    th: "เชิญเพื่อนร่วมทีมในฐานะผู้ดูแลหรือผู้ประสานงานมาร่วมจัดการโปรแกรม",
  },
  "landing.flexPackages": {
    en: "Flexible learning packages",
    th: "แพ็กเกจการเรียนรู้ที่ยืดหยุ่น",
  },
  "landing.flexPackagesDesc": {
    en: "Start with a free option, then upgrade as your learning community scales.",
    th: "เริ่มต้นฟรี แล้วอัปเกรดเมื่อชุมชนการเรียนรู้ของคุณเติบโต",
  },

  // ─── Landing Page: Stats ───
  "landing.statFree": {
    en: "Always free for learners",
    th: "ฟรีตลอดสำหรับผู้เรียน",
  },
  "landing.statPackages": {
    en: "Packages for organizations",
    th: "แพ็กเกจสำหรับองค์กร",
  },
  "landing.statSeats": {
    en: "Team seats per workspace",
    th: "ที่นั่งทีมต่อพื้นที่ทำงาน",
  },
  "landing.statRealtime": {
    en: "Real-time progress updates",
    th: "อัปเดตความก้าวหน้าแบบเรียลไทม์",
  },

  // ─── Landing Page: CTA ───
  "landing.readyTitle": {
    en: "Ready to get started?",
    th: "พร้อมเริ่มต้นหรือยัง?",
  },
  "landing.readyDesc": {
    en: "Whether you're looking to upskill or create learning programs, MyFuture makes it simple. Sign up free and start today.",
    th: "ไม่ว่าคุณจะต้องการอัปสกิลหรือสร้างโปรแกรมเรียน MyFuture ทำให้ง่าย สมัครฟรีแล้วเริ่มวันนี้",
  },

  // ─── หน้า Learning Pathways (Jobs List) ───
  "jobs.pageTitle": {
    en: "Explore Learning Pathways",
    th: "สำรวจเส้นทางการเรียนรู้",
  },
  "jobs.pageDesc": {
    en: "Search learning pathways by title, topic, or type — then save the ones you like.",
    th: "ค้นหาเส้นทางการเรียนรู้ตามหัวข้อ สาขา หรือประเภท — แล้วบันทึกสิ่งที่สนใจ",
  },
  "jobs.searchPlaceholder": {
    en: "Title, provider, or skill",
    th: "หัวข้อ, ผู้สอน, หรือทักษะ",
  },
  "jobs.locationPlaceholder": {
    en: "Location",
    th: "สถานที่",
  },
  "jobs.anyWorkplace": {
    en: "Any format",
    th: "ทุกรูปแบบ",
  },
  "jobs.remote": {
    en: "Remote",
    th: "ออนไลน์",
  },
  "jobs.hybrid": {
    en: "Hybrid",
    th: "ผสมผสาน",
  },
  "jobs.onSite": {
    en: "On-site",
    th: "เรียนในห้อง",
  },
  "jobs.anyType": {
    en: "Any type",
    th: "ทุกประเภท",
  },
  "jobs.fullTime": {
    en: "Full-time",
    th: "เต็มเวลา",
  },
  "jobs.partTime": {
    en: "Part-time",
    th: "บางเวลา",
  },
  "jobs.contract": {
    en: "Contract",
    th: "สัญญาจ้าง",
  },
  "jobs.internship": {
    en: "Internship",
    th: "ฝึกงาน",
  },
  "jobs.temporary": {
    en: "Temporary",
    th: "ชั่วคราว",
  },
  "jobs.popularTopics": { en: "Popular:", th: "ยอดนิยม:" },
  "jobs.allTopics": { en: "All", th: "ทั้งหมด" },
  "jobs.salaryNotListed": { en: "Salary not listed", th: "ไม่ระบุค่าตอบแทน" },
  "jobs.noMatch": {
    en: "No learning pathways match your filters",
    th: "ไม่พบเส้นทางการเรียนรู้ที่ตรงกับตัวกรอง",
  },
  "jobs.tryBroadening": {
    en: "Try broadening your search or removing some filters to see more results.",
    th: "ลองขยายการค้นหาหรือลบตัวกรองบางส่วนเพื่อดูผลลัพธ์เพิ่มเติม",
  },
  "jobs.savedToFavorites": {
    en: "Saved to your favorites.",
    th: "บันทึกไว้ในรายการโปรดแล้ว",
  },
  "jobs.removedFromSaved": {
    en: "Removed from saved.",
    th: "ลบออกจากรายการที่บันทึกแล้ว",
  },

  // ─── หน้ารายละเอียด (Job Detail) ───
  "detail.backToAll": {
    en: "Back to all learning pathways",
    th: "กลับไปดูเส้นทางการเรียนรู้ทั้งหมด",
  },
  "detail.notAvailable": {
    en: "This learning pathway is no longer available",
    th: "เส้นทางการเรียนรู้นี้ไม่พร้อมให้บริการแล้ว",
  },
  "detail.notAvailableDesc": {
    en: "It may have been closed or removed by the provider.",
    th: "อาจถูกปิดหรือลบโดยผู้ให้บริการ",
  },
  "detail.allPaths": {
    en: "All learning pathways",
    th: "เส้นทางการเรียนรู้ทั้งหมด",
  },
  "detail.saved": {
    en: "Saved",
    th: "บันทึกแล้ว",
  },
  "detail.savePath": {
    en: "Save this path",
    th: "บันทึกเส้นทางนี้",
  },
  "detail.startLearningDesc": {
    en: "Start learning in this program directly — it only takes a minute.",
    th: "เริ่มเรียนรู้ในโปรแกรมนี้ได้เลย — ใช้เวลาแค่ไม่กี่นาที",
  },
  "detail.addNameInfo": {
    en: "Add your name and basic info so Learning Providers can see who enrolled.",
    th: "กรอกชื่อและข้อมูลพื้นฐานเพื่อให้ผู้ให้โปรแกรมเรียนเห็นว่าใครลงทะเบียน",
  },
  "detail.profileShared": {
    en: "Your profile will be shared",
    th: "โปรไฟล์ของคุณจะถูกแชร์",
  },
  "detail.coverLetter": {
    en: "Note to provider",
    th: "บันทึกถึงผู้สอน",
  },
  "detail.coverLetterPlaceholder": {
    en: "Tell them why you're interested in this learning path...",
    th: "บอกเหตุผลว่าทำไมคุณถึงสนใจเส้นทางการเรียนรู้นี้...",
  },
  "detail.coverLetterHint": {
    en: "Optional, but a short note can make a difference.",
    th: "ไม่จำเป็น แต่ข้อความสั้นๆ อาจช่วยได้",
  },
  "detail.skillsYouWillLearn": {
    en: "Skills You Will Learn",
    th: "ทักษะที่คุณจะได้เรียนรู้",
  },
  "detail.skillsComingSoon": {
    en: "Skill details will be available soon — stay tuned!",
    th: "รายละเอียดทักษะกำลังจะมา — รอติดตามนะ!",
  },

  // ─── หน้า Applications (ความก้าวหน้า) ───
  "apps.pageTitle": {
    en: "Your Learning Progress",
    th: "ความก้าวหน้าการเรียนรู้ของคุณ",
  },
  "apps.pageDesc": {
    en: "Track every learning path you've enrolled in and see where things stand.",
    th: "ติดตามทุกเส้นทางการเรียนรู้ที่คุณลงทะเบียนไว้",
  },
  "apps.noAppsYet": {
    en: "No enrollments yet",
    th: "ยังไม่มีการลงทะเบียน",
  },
  "apps.noAppsDesc": {
    en: "You haven't enrolled in any learning paths. Browse pathways to find your next skill.",
    th: "คุณยังไม่ได้ลงทะเบียนเรียน สำรวจเส้นทางการเรียนรู้เพื่อหาทักษะถัดไป",
  },
  "apps.browsePaths": {
    en: "Browse learning pathways",
    th: "สำรวจเส้นทางการเรียนรู้",
  },
  "apps.pathUnavailable": {
    en: "Learning path unavailable",
    th: "เส้นทางการเรียนรู้ไม่พร้อมใช้งาน",
  },
  "apps.unknownProvider": {
    en: "Unknown provider",
    th: "ผู้ให้บริการไม่ทราบ",
  },
  "apps.yourNote": {
    en: "Your note",
    th: "บันทึกของคุณ",
  },
  "apps.timeline": {
    en: "Timeline",
    th: "ไทม์ไลน์",
  },
  "apps.enrolled": {
    en: "Enrolled",
    th: "ลงทะเบียนแล้ว",
  },
  "apps.updated": {
    en: "Updated",
    th: "อัปเดตแล้ว",
  },
  "apps.decision": {
    en: "Decision",
    th: "ผลตัดสิน",
  },
  "apps.viewPath": {
    en: "View learning path",
    th: "ดูเส้นทางการเรียนรู้",
  },
  "apps.withdraw": {
    en: "Withdraw enrollment",
    th: "ยกเลิกการลงทะเบียน",
  },
  "apps.withdrawing": {
    en: "Withdrawing…",
    th: "กำลังยกเลิก…",
  },
  "apps.withdrawn": {
    en: "Enrollment withdrawn.",
    th: "ยกเลิกการลงทะเบียนแล้ว",
  },
  "apps.couldNotWithdraw": {
    en: "Could not withdraw enrollment.",
    th: "ไม่สามารถยกเลิกการลงทะเบียนได้",
  },

  // ─── หน้า Favorites (บันทึกไว้) ───
  "favs.pageTitle": {
    en: "Saved Learning Pathways",
    th: "เส้นทางการเรียนรู้ที่บันทึกไว้",
  },
  "favs.pageDesc": {
    en: "Learning pathways you've bookmarked — come back anytime.",
    th: "เส้นทางการเรียนรู้ที่คุณบุ๊กมาร์กไว้ — กลับมาดูได้ทุกเมื่อ",
  },
  "favs.nothingSaved": {
    en: "Nothing saved yet",
    th: "ยังไม่มีรายการที่บันทึก",
  },
  "favs.nothingSavedDesc": {
    en: "Browse learning pathways and tap the bookmark icon to save ones you want to come back to.",
    th: "สำรวจเส้นทางการเรียนรู้แล้วแตะไอคอนบุ๊กมาร์กเพื่อบันทึกรายการที่สนใจ",
  },
  "favs.browseBtn": {
    en: "Browse learning pathways",
    th: "สำรวจเส้นทางการเรียนรู้",
  },
  "favs.removed": {
    en: "Removed from saved.",
    th: "ลบออกจากรายการที่บันทึกแล้ว",
  },
  "favs.couldNotRemove": {
    en: "Could not remove saved item.",
    th: "ไม่สามารถลบรายการที่บันทึกได้",
  },

  // ─── Company Layout (ฝั่งผู้ให้บริการ) ───
  "company.dashboard": {
    en: "Dashboard",
    th: "แดชบอร์ด",
  },
  "company.learningPrograms": {
    en: "Learning Programs",
    th: "โปรแกรมการเรียนรู้",
  },
  "company.enrollments": {
    en: "Enrollments",
    th: "การลงทะเบียน",
  },
  "company.postProgram": {
    en: "Post program",
    th: "สร้างโปรแกรม",
  },
  "company.post": {
    en: "Post",
    th: "สร้าง",
  },

  // ─── เมนู Navbar: โปรไฟล์ ───
  "nav.profile": {
    en: "Profile",
    th: "โปรไฟล์",
  },

  // ─── Company Dashboard Page (ฝั่งผู้ให้บริการ) ───
  "companyDash.title": {
    en: "Learning Provider Dashboard",
    th: "แดชบอร์ดผู้ให้โปรแกรมเรียน",
  },
  "companyDash.subtitle": {
    en: "This NSC demo hides the complex dashboard and billing UI. Use the program and learner pages instead.",
    th: "NSC demo นี้ซ่อน UI แดชบอร์ดที่ซับซ้อนไว้ ใช้หน้าโปรแกรมและผู้เรียนแทน",
  },
  "companyDash.disabledNote": {
    en: "Dashboard content is intentionally disabled for a cleaner edu-tech experience.",
    th: "เนื้อหาแดชบอร์ดถูกปิดไว้โดยตั้งใจเพื่อประสบการณ์ edu-tech ที่สะอาดขึ้น",
  },
  "companyDash.viewPrograms": {
    en: "View programs",
    th: "ดูโปรแกรมทั้งหมด",
  },
  "companyDash.reviewLearners": {
    en: "Review learners",
    th: "ตรวจสอบผู้เรียน",
  },
  "companyDash.selectOrg": {
    en: "Select an organization",
    th: "เลือกองค์กร",
  },
  "companyDash.selectOrgDesc": {
    en: "Use the organization switcher above to pick your organization workspace.",
    th: "ใช้ตัวสลับองค์กรด้านบนเพื่อเลือกพื้นที่ทำงานขององค์กร",
  },

  // ─── Favorites Mockup (การ์ดจำลอง) ───
  "favs.emptyTitle": {
    en: "No learning paths saved yet?",
    th: "คุณยังไม่มีเส้นทางการเรียนรู้ที่ถูกใจเลย?",
  },
  "favs.emptyDesc": {
    en: "Explore pathways to find the right future for you!",
    th: "ลองสำรวจเพื่อหาอนาคตที่ใช่สำหรับคุณ!",
  },
  "favs.exploreCta": {
    en: "Start exploring learning pathways",
    th: "เริ่มสำรวจเส้นทางการเรียนรู้",
  },
  "favs.mockProvider": {
    en: "by MyFuture Academy",
    th: "โดย สถาบัน MyFuture Academy",
  },
  "favs.mockSkills": {
    en: "Skills you will gain: Python, SQL, Tableau, Power BI",
    th: "ทักษะที่จะได้รับ: Python, SQL, Tableau, Power BI",
  },
  "favs.mockProgress": {
    en: "0% (Not started)",
    th: "0% (ยังไม่ได้เริ่ม)",
  },
  "favs.removeFromFavs": {
    en: "Remove from favorites",
    th: "นำออกจากรายการโปรด",
  },

  // ─── Company Jobs Page (หน้ารายการโปรแกรม) ───
  "companyJobs.title": {
    en: "Program listings",
    th: "รายการโปรแกรม",
  },
  "companyJobs.subtitle": {
    en: "Manage your organization's open and closed programs.",
    th: "จัดการโปรแกรมที่เปิดและปิดขององค์กร",
  },
  "companyJobs.newListing": {
    en: "New listing",
    th: "สร้างรายการใหม่",
  },
  "companyJobs.active": {
    en: "Active",
    th: "เปิดอยู่",
  },
  "companyJobs.closed": {
    en: "Closed",
    th: "ปิดแล้ว",
  },
  "companyJobs.noActive": {
    en: "No active listings",
    th: "ไม่มีรายการที่เปิดอยู่",
  },
  "companyJobs.noClosed": {
    en: "No closed listings",
    th: "ไม่มีรายการที่ปิดแล้ว",
  },
  "companyJobs.postNewDesc": {
    en: "Post a new program to start receiving enrollments from learners.",
    th: "สร้างโปรแกรมใหม่เพื่อเริ่มรับการลงทะเบียนจากผู้เรียน",
  },
  "companyJobs.closedWillAppear": {
    en: "Closed programs will appear here.",
    th: "โปรแกรมที่ปิดแล้วจะแสดงที่นี่",
  },
  "companyJobs.postFirst": {
    en: "Post your first program",
    th: "สร้างโปรแกรมแรกของคุณ",
  },
  "companyJobs.closeListing": {
    en: "Close listing",
    th: "ปิดรายการ",
  },
  "companyJobs.reopen": {
    en: "Reopen",
    th: "เปิดอีกครั้ง",
  },
  "companyJobs.edit": {
    en: "Edit",
    th: "แก้ไข",
  },
  "companyJobs.autoClose": {
    en: "Auto-close",
    th: "ปิดอัตโนมัติ",
  },
  "companyJobs.enableAutoClose": {
    en: "Enable auto-close",
    th: "เปิดใช้ปิดอัตโนมัติ",
  },
  "companyJobs.disableAutoClose": {
    en: "Disable auto-close",
    th: "ปิดใช้ปิดอัตโนมัติ",
  },
  "companyJobs.readOnly": {
    en: "Read-only access for your role.",
    th: "สิทธิ์ดูอย่างเดียวสำหรับบทบาทของคุณ",
  },
  "companyJobs.noAppsYet": {
    en: "No applications yet",
    th: "ยังไม่มีผู้สมัคร",
  },
  "companyJobs.selectOrg": {
    en: "Select an organization to continue.",
    th: "เลือกองค์กรเพื่อดำเนินการต่อ",
  },
  "companyJobs.syncing": {
    en: "Your organization data is still syncing. Refresh in a few seconds.",
    th: "ข้อมูลองค์กรกำลังซิงค์อยู่ รอสักครู่แล้วรีเฟรช",
  },
  "companyJobs.applicant": {
    en: "applicant",
    th: "ผู้สมัคร",
  },
  "companyJobs.applicants": {
    en: "applicants",
    th: "ผู้สมัคร",
  },

  // ─── Company Applications Page (หน้าตรวจสอบผู้เรียน) ───
  "companyApps.title": {
    en: "Enrollments",
    th: "การลงทะเบียน",
  },
  "companyApps.subtitle": {
    en: "Review learner profiles and make enrollment decisions.",
    th: "ตรวจสอบโปรไฟล์ผู้เรียนและตัดสินใจเรื่องการลงทะเบียน",
  },
  "companyApps.allStatuses": {
    en: "All statuses",
    th: "ทุกสถานะ",
  },
  "companyApps.submitted": {
    en: "Submitted",
    th: "ส่งแล้ว",
  },
  "companyApps.inReview": {
    en: "In review",
    th: "กำลังตรวจสอบ",
  },
  "companyApps.accepted": {
    en: "Accepted",
    th: "ตอบรับแล้ว",
  },
  "companyApps.rejected": {
    en: "Rejected",
    th: "ปฏิเสธแล้ว",
  },
  "companyApps.withdrawn": {
    en: "Withdrawn",
    th: "ถอนแล้ว",
  },
  "companyApps.noFound": {
    en: "No applications found",
    th: "ไม่พบการลงทะเบียน",
  },
  "companyApps.willAppear": {
    en: "Applications will appear here once learners enroll in your programs.",
    th: "การลงทะเบียนจะปรากฏที่นี่เมื่อผู้เรียนลงทะเบียนในโปรแกรมของคุณ",
  },
  "companyApps.noMatch": {
    en: "No applications match your filters. Try adjusting them.",
    th: "ไม่มีการลงทะเบียนที่ตรงกับตัวกรอง ลองปรับตัวกรองดู",
  },
  "companyApps.appliedFor": {
    en: "Applied for",
    th: "สมัครเข้า",
  },
  "companyApps.unknownJob": {
    en: "Unknown program",
    th: "โปรแกรมไม่ทราบ",
  },
  "companyApps.summary": {
    en: "Summary",
    th: "สรุป",
  },
  "companyApps.coverLetter": {
    en: "Cover Letter",
    th: "จดหมายแนะนำตัว",
  },
  "companyApps.experience": {
    en: "Experience",
    th: "ประสบการณ์",
  },
  "companyApps.education": {
    en: "Education",
    th: "การศึกษา",
  },
  "companyApps.certifications": {
    en: "Certifications",
    th: "ใบรับรอง",
  },
  "companyApps.skills": {
    en: "Skills",
    th: "ทักษะ",
  },
  "companyApps.contactLinks": {
    en: "Contact & Links",
    th: "ข้อมูลติดต่อ & ลิงก์",
  },
  "companyApps.resumeResources": {
    en: "Resume & Resources",
    th: "เรซูเม่ & เอกสาร",
  },
  "companyApps.yearsExp": {
    en: "Years of experience",
    th: "ปีประสบการณ์",
  },
  "companyApps.actions": {
    en: "Actions",
    th: "การดำเนินการ",
  },
  "companyApps.moveToReview": {
    en: "Move to review",
    th: "ย้ายไปตรวจสอบ",
  },
  "companyApps.acceptCandidate": {
    en: "Accept learner",
    th: "ตอบรับผู้เรียน",
  },
  "companyApps.rejectCandidate": {
    en: "Reject learner",
    th: "ปฏิเสธผู้เรียน",
  },
  "companyApps.noProfile": {
    en: "This learner hasn't completed their profile yet.",
    th: "ผู้เรียนคนนี้ยังไม่ได้กรอกโปรไฟล์",
  },
  "companyApps.skillsFilter": {
    en: "Skills (comma-separated)",
    th: "ทักษะ (คั่นด้วยเครื่องหมายจุลภาค)",
  },
  "companyApps.minYears": {
    en: "Min years",
    th: "ปีขั้นต่ำ",
  },
  "companyApps.maxYears": {
    en: "Max years",
    th: "ปีสูงสุด",
  },
  "companyApps.clearFilters": {
    en: "Clear filters",
    th: "ล้างตัวกรอง",
  },

  // ─── Company New Job Page (สร้างโปรแกรมใหม่) ───
  "companyNew.backToJobs": {
    en: "Back to programs",
    th: "กลับไปรายการโปรแกรม",
  },
  "companyNew.title": {
    en: "Post a new program",
    th: "สร้างโปรแกรมใหม่",
  },
  "companyNew.subtitle": {
    en: "This listing will be visible to learners once published.",
    th: "รายการนี้จะแสดงให้ผู้เรียนเห็นเมื่อเผยแพร่แล้ว",
  },
  "companyNew.basics": {
    en: "Basics",
    th: "ข้อมูลพื้นฐาน",
  },
  "companyNew.programTitle": {
    en: "Program title",
    th: "ชื่อโปรแกรม",
  },
  "companyNew.programTitlePlaceholder": {
    en: "e.g. Data Analyst Expert Path",
    th: "เช่น เส้นทางสู่ผู้เชี่ยวชาญด้านการวิเคราะห์ข้อมูล",
  },
  "companyNew.programTitleDesc": {
    en: "The title learners will see in search.",
    th: "ชื่อที่ผู้เรียนจะเห็นในการค้นหา",
  },
  "companyNew.description": {
    en: "Description",
    th: "รายละเอียด",
  },
  "companyNew.descPlaceholder": {
    en: "Program summary, requirements, learning outcomes...",
    th: "สรุปโปรแกรม ข้อกำหนด ผลลัพธ์การเรียนรู้...",
  },
  "companyNew.descHint": {
    en: "Describe the program, target learners, and what they will gain.",
    th: "อธิบายโปรแกรม กลุ่มเป้าหมาย และสิ่งที่ผู้เรียนจะได้รับ",
  },
  "companyNew.details": {
    en: "Details",
    th: "รายละเอียดเพิ่มเติม",
  },
  "companyNew.location": {
    en: "Location",
    th: "สถานที่",
  },
  "companyNew.employmentType": {
    en: "Learning type",
    th: "ประเภทการเรียนรู้",
  },
  "companyNew.workplaceType": {
    en: "Format",
    th: "รูปแบบ",
  },
  "companyNew.fullTime": {
    en: "Full time",
    th: "เต็มเวลา",
  },
  "companyNew.partTime": {
    en: "Part time",
    th: "บางเวลา",
  },
  "companyNew.contract": {
    en: "Contract",
    th: "สัญญาจ้าง",
  },
  "companyNew.internship": {
    en: "Internship",
    th: "ฝึกงาน",
  },
  "companyNew.temporary": {
    en: "Temporary",
    th: "ชั่วคราว",
  },
  "companyNew.onSite": {
    en: "On site",
    th: "เรียนในห้อง",
  },
  "companyNew.hybrid": {
    en: "Hybrid",
    th: "ผสมผสาน",
  },
  "companyNew.remote": {
    en: "Remote",
    th: "ออนไลน์",
  },
  "companyNew.salaryMin": {
    en: "Salary min",
    th: "เงินเดือนขั้นต่ำ",
  },
  "companyNew.salaryMax": {
    en: "Salary max",
    th: "เงินเดือนสูงสุด",
  },
  "companyNew.currency": {
    en: "Currency",
    th: "สกุลเงิน",
  },
  "companyNew.tags": {
    en: "Tags",
    th: "แท็ก",
  },
  "companyNew.tagsDesc": {
    en: "Comma-separated tags to help learners find this program.",
    th: "แท็กคั่นด้วยเครื่องหมายจุลภาค เพื่อช่วยให้ผู้เรียนค้นหาโปรแกรมนี้",
  },
  "companyNew.settings": {
    en: "Settings",
    th: "ตั้งค่า",
  },
  "companyNew.autoCloseLabel": {
    en: "Auto-close after first accepted learner",
    th: "ปิดอัตโนมัติหลังตอบรับผู้เรียนคนแรก",
  },
  "companyNew.autoCloseDesc": {
    en: "Best for limited-seat programs. Leave off if you accept multiple learners.",
    th: "เหมาะสำหรับโปรแกรมที่นั่งจำกัด ปิดไว้หากรับผู้เรียนหลายคน",
  },
  "companyNew.publish": {
    en: "Publish listing",
    th: "เผยแพร่รายการ",
  },
  "companyNew.creating": {
    en: "Creating...",
    th: "กำลังสร้าง...",
  },
  "companyNew.cancel": {
    en: "Cancel",
    th: "ยกเลิก",
  },
  "companyNew.limitReached": {
    en: "Active program limit reached",
    th: "ถึงจำนวนโปรแกรมที่เปิดได้สูงสุดแล้ว",
  },
  "companyNew.closeToContinue": {
    en: "Close an existing listing to open a new one.",
    th: "ปิดรายการที่มีอยู่เพื่อเปิดรายการใหม่",
  },
  "companyNew.readOnly": {
    en: "Read-only access",
    th: "สิทธิ์ดูอย่างเดียว",
  },
  "companyNew.readOnlyDesc": {
    en: "Only admins and recruiters can create listings.",
    th: "เฉพาะผู้ดูแลและผู้ประสานงานเท่านั้นที่สร้างรายการได้",
  },
  "companyNew.selectOrg": {
    en: "Select an organization to continue.",
    th: "เลือกองค์กรเพื่อดำเนินการต่อ",
  },
  "companyNew.syncing": {
    en: "Your organization has not synced yet. Wait a few seconds and refresh.",
    th: "องค์กรของคุณยังไม่ได้ซิงค์ รอสักครู่แล้วรีเฟรช",
  },

  // ─── Profile Page (หน้าโปรไฟล์) ───
  "prof.openToWork": { en: "Open to work", th: "พร้อมเรียนรู้" },
  "prof.yourName": { en: "Your Name", th: "ชื่อของคุณ" },
  "prof.about": { en: "About", th: "เกี่ยวกับ" },
  "prof.loading": { en: "Loading…", th: "กำลังโหลด…" },
  "prof.yearsExpMustBeNumber": { en: "Years of experience must be a number.", th: "ปีประสบการณ์ต้องเป็นตัวเลข" },
  "prof.saved": { en: "Profile saved.", th: "บันทึกโปรไฟล์แล้ว" },
  "prof.couldNotSave": { en: "Could not save profile.", th: "ไม่สามารถบันทึกโปรไฟล์ได้" },
  "prof.firstName": { en: "First name", th: "ชื่อ" },
  "prof.firstNamePh": { en: "Your first name", th: "ชื่อจริงของคุณ" },
  "prof.lastName": { en: "Last name", th: "นามสกุล" },
  "prof.lastNamePh": { en: "Your last name", th: "นามสกุลของคุณ" },
  "prof.headline": { en: "Headline", th: "หัวข้อ" },
  "prof.headlinePh": { en: "e.g. Senior Frontend Engineer", th: "เช่น นักวิเคราะห์ข้อมูลอาวุโส" },
  "prof.headlineDesc": { en: "A short title that describes what you do.", th: "ตำแหน่งสั้น ๆ ที่อธิบายสิ่งที่คุณทำ" },
  "prof.summary": { en: "Summary", th: "สรุป" },
  "prof.summaryPh": { en: "Write a compelling summary of your professional background, key achievements, and what you're looking for...", th: "เขียนสรุปเกี่ยวกับพื้นฐานวิชาชีพ ผลงานสำคัญ และสิ่งที่คุณกำลังมองหา..." },
  "prof.summaryDesc": { en: "Your professional elevator pitch — recruiters see this first.", th: "บทนำแบบย่อของคุณ — องค์กรจะเห็นส่วนนี้ก่อน" },
  "prof.bio": { en: "Bio", th: "เกี่ยวกับตัวเอง" },
  "prof.bioPh": { en: "A more personal note about your interests, passions, or what drives you...", th: "เขียนเกี่ยวกับความสนใจ แรงบันดาลใจ หรือแรงขับเคลื่อนของคุณ..." },
  "prof.location": { en: "Location", th: "ที่อยู่" },
  "prof.locationPh": { en: "e.g. Bangkok, Thailand", th: "เช่น กรุงเทพฯ, ประเทศไทย" },
  "prof.yearsExp": { en: "Years of experience", th: "ปีประสบการณ์" },
  "prof.yearsExpPh": { en: "e.g. 5", th: "เช่น 5" },
  "prof.phone": { en: "Phone", th: "โทรศัพท์" },
  "prof.phonePh": { en: "+66 (0) 00-000-0000", th: "+66 (0) 00-000-0000" },
  "prof.portfolio": { en: "Portfolio / Website", th: "พอร์ตโฟลิโอ / เว็บไซต์" },
  "prof.portfolioPh": { en: "https://yoursite.com", th: "https://yoursite.com" },
  "prof.linkedinUrl": { en: "LinkedIn URL", th: "ลิงก์ LinkedIn" },
  "prof.linkedinPh": { en: "https://linkedin.com/in/yourname", th: "https://linkedin.com/in/yourname" },
  "prof.githubUrl": { en: "GitHub URL", th: "ลิงก์ GitHub" },
  "prof.githubPh": { en: "https://github.com/yourname", th: "https://github.com/yourname" },
  "prof.skills": { en: "Skills", th: "ทักษะ" },
  "prof.skillsPh": { en: "React, TypeScript, Product design", th: "React, TypeScript, Product design" },
  "prof.skillsDesc": { en: "Separate skills with commas.", th: "คั่นทักษะด้วยเครื่องหมายจุลภาค" },
  "prof.openToWorkLabel": { en: "Open to work", th: "พร้อมเรียนรู้" },
  "prof.openToWorkDesc": { en: "Let organizations know you're available.", th: "แจ้งให้องค์กรทราบว่าคุณพร้อม" },
  "prof.saveProfile": { en: "Save profile", th: "บันทึกโปรไฟล์" },
  "prof.experience": { en: "Experience", th: "ประสบการณ์" },
  "prof.add": { en: "Add", th: "เพิ่ม" },
  "prof.noExpYet": { en: "No experience added yet. Add your work history to stand out to recruiters.", th: "ยังไม่มีประสบการณ์ เพิ่มประวัติการทำงานเพื่อโดดเด่นต่อองค์กร" },
  "prof.education": { en: "Education", th: "การศึกษา" },
  "prof.noEduYet": { en: "No education added yet.", th: "ยังไม่มีข้อมูลการศึกษา" },
  "prof.certifications": { en: "Certifications", th: "ใบรับรอง" },
  "prof.noCertYet": { en: "No certifications added yet.", th: "ยังไม่มีใบรับรอง" },
  "prof.atAGlance": { en: "At a glance", th: "ภาพรวม" },
  "prof.rolesListed": { en: "Roles listed", th: "ตำแหน่งที่ระบุ" },
  "prof.files": { en: "Files", th: "ไฟล์" },
  "prof.years": { en: "years", th: "ปี" },
  "prof.resumeResources": { en: "Resume & Resources", th: "เรซูเม่ & เอกสาร" },
  "prof.resumeDesc": { en: "Upload your resume, portfolio, or any files to share with organizations. Max 10 MB per file, up to 10 files.", th: "อัปโหลดเรซูเม่ พอร์ตโฟลิโอ หรือไฟล์เพื่อแชร์กับองค์กร สูงสุด 10 MB ต่อไฟล์ ไม่เกิน 10 ไฟล์" },
  "prof.noFilesYet": { en: "No files uploaded yet.", th: "ยังไม่มีไฟล์ที่อัปโหลด" },
  "prof.addSkillsToSee": { en: "Add some skills to your profile to see the analysis.", th: "เพิ่มทักษะในโปรไฟล์เพื่อดูการวิเคราะห์" },
  "prof.present": { en: "Present", th: "ปัจจุบัน" },
  "prof.saving": { en: "Saving...", th: "กำลังบันทึก..." },
  "prof.save": { en: "Save", th: "บันทึก" },
  "prof.cancel": { en: "Cancel", th: "ยกเลิก" },
  "prof.jobTitlePh": { en: "Job title *", th: "ตำแหน่งงาน *" },
  "prof.companyPh": { en: "Company *", th: "บริษัท *" },
  "prof.startDatePh": { en: "Start date (e.g. Jan 2022)", th: "วันที่เริ่ม (เช่น ม.ค. 2565)" },
  "prof.endDatePh": { en: "End date (or leave blank)", th: "วันที่สิ้นสุด (หรือเว้นว่าง)" },
  "prof.iCurrentlyWork": { en: "I currently work here", th: "ฉันทำงานที่นี่อยู่ปัจจุบัน" },
  "prof.descOptional": { en: "Description (optional)", th: "คำอธิบาย (ไม่บังคับ)" },
  "prof.schoolPh": { en: "School *", th: "สถานศึกษา *" },
  "prof.degreePh": { en: "Degree (e.g. Bachelor's)", th: "วุฒิการศึกษา (เช่น ปริญญาตรี)" },
  "prof.fieldOfStudyPh": { en: "Field of study", th: "สาขาวิชา" },
  "prof.startYearPh": { en: "Start year", th: "ปีที่เริ่ม" },
  "prof.endYearPh": { en: "End year", th: "ปีที่จบ" },
  "prof.eduDescPh": { en: "Activities, honors, description (optional)", th: "กิจกรรม เกียรตินิยม คำอธิบาย (ไม่บังคับ)" },
  "prof.certNamePh": { en: "Certification name *", th: "ชื่อใบรับรอง *" },
  "prof.issuingOrgPh": { en: "Issuing organization *", th: "องค์กรที่ออก *" },
  "prof.issueDatePh": { en: "Issue date", th: "วันที่ออก" },
  "prof.expirationDatePh": { en: "Expiration date", th: "วันหมดอายุ" },
  "prof.credentialUrlPh": { en: "Credential URL (optional)", th: "ลิงก์ใบรับรอง (ไม่บังคับ)" },
  "prof.issued": { en: "Issued", th: "ออกเมื่อ" },
  "prof.expires": { en: "Expires", th: "หมดอายุ" },
  "prof.viewCredential": { en: "View credential", th: "ดูใบรับรอง" },
  "prof.uploading": { en: "Uploading...", th: "กำลังอัปโหลด..." },
  "prof.fileLimitReached": { en: "File limit reached", th: "ถึงจำนวนไฟล์สูงสุดแล้ว" },
  "prof.dropOrBrowse": { en: "Drop a file here or click to browse", th: "ลากไฟล์มาวางที่นี่หรือคลิกเพื่อเลือก" },
  "prof.fileTypes": { en: "PDF, DOC, images, or any file up to 10 MB", th: "PDF, DOC, รูปภาพ หรือไฟล์ใด ๆ สูงสุด 10 MB" },
  "prof.fileTooLarge": { en: "File exceeds the 10 MB limit.", th: "ไฟล์เกินขนาดจำกัด 10 MB" },

  // ─── Metadata / ทั่วไป ───
  "meta.title": {
    en: "MyFuture — Reskill & Upskill Platform",
    th: "MyFuture — แพลตฟอร์ม Reskill & Upskill",
  },
  "meta.description": {
    en: "A friendly learning platform for reskilling and upskilling. Explore, learn, and grow with confidence.",
    th: "แพลตฟอร์มการเรียนรู้สำหรับ Reskill และ Upskill สำรวจ เรียนรู้ และเติบโตอย่างมั่นใจ",
  },
};

type TranslationKey = keyof typeof translations;
export type { TranslationKey };

/**
 * LanguageProvider — ผู้ให้บริบทภาษาทั่วทั้งแอป
 *
 * วิธีแก้ Hydration Error:
 * ─────────────────────────────────────────────────────────────────
 * ปัญหา: useState initializer ที่อ่าน localStorage จะทำงานต่างกัน
 *        ระหว่าง Server (ไม่มี localStorage → ได้ "en") กับ Client
 *        (มี localStorage → อาจได้ "th") ทำให้ React เจอ text mismatch
 *        เช่น "Skill Paths" vs "เส้นทางอัปสกิล"
 *
 * วิธีแก้: ใช้ "en" เป็นค่าเริ่มต้นเสมอ (ทั้ง Server + Client render แรก)
 *         จากนั้นใช้ useEffect (ทำงานหลัง mount เท่านั้น) เพื่อ sync ค่า
 *         จาก localStorage → ไม่มี mismatch อีกต่อไป
 *
 * mounted flag ใช้เพื่อป้องกันการ flash ภาษาผิด:
 * - ก่อน mount: แสดง "en" (ตรงกับ SSR)
 * - หลัง mount: แสดงภาษาที่ผู้ใช้เลือกไว้
 * ─────────────────────────────────────────────────────────────────
 */
export function LanguageProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // เริ่มด้วย "en" เสมอ เพื่อให้ SSR กับ Client render แรกตรงกัน
  const [lang, setLangState] = useState<Lang>("en");
  // flag บอกว่า component mount แล้วหรือยัง
  const [mounted, setMounted] = useState(false);

  // useEffect ทำงานหลัง mount เท่านั้น → อ่าน localStorage แล้ว sync ภาษา
  useEffect(() => {
    const saved = window.localStorage.getItem("myfuture_lang");
    if (saved === "en" || saved === "th") {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("myfuture_lang", next);
  };

  // ภาษาที่ใช้จริง: ก่อน mount ใช้ "en" (ตรง SSR), หลัง mount ใช้ค่าจาก state
  const activeLang = mounted ? lang : "en";

  const value = useMemo<LanguageContextValue>(() => {
    return {
      lang: activeLang,
      setLang,
      t: (key) => {
        const entry = translations[key as TranslationKey];
        return entry[activeLang];
      },
    };
  }, [activeLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

