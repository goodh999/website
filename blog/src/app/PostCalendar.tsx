"use client";
import React, { useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface PostMeta {
  date: string;
  slug: string;
  title: string;
}

export default function PostCalendar({ posts }: { posts: PostMeta[] }) {
  // 投稿日のみ抽出
  const postDates = useMemo(() => posts.map(p => p.date), [posts]);

  // カレンダーの日付に記事があればマーク
  function tileContent({ date, view }: { date: Date; view: string }) {
    if (view === "month") {
      const d = date.toISOString().slice(0, 10);
      if (postDates.includes(d)) {
        return <span style={{ color: "red", fontWeight: "bold" }}>●</span>;
      }
    }
    return null;
  }

  // 日付クリックでその日の記事一覧をalert表示（シンプル実装）
  function onClickDay(date: Date) {
    const d = date.toISOString().slice(0, 10);
    const dayPosts = posts.filter(p => p.date === d);
    if (dayPosts.length > 0) {
      alert(dayPosts.map(p => p.title).join("\n"));
    }
  }

  return (
    <section style={{ margin: "32px 0" }}>
      <h3>投稿カレンダー</h3>
      <Calendar
        tileContent={tileContent}
        onClickDay={onClickDay}
      />
    </section>
  );
} 