"use client";
export default function DashboardFooter() {
  return (
    <footer className="text-center py-4 text-xs text-muted-foreground">
      &copy; {new Date().getFullYear()} bt. All rights reserved.
    </footer>
  );
}
