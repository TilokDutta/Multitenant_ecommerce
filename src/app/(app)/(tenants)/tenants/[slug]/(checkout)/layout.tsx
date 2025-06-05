import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar} from "@/modules/checkout/ui/components/navbar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const layout = async ({ children, params }: LayoutProps) => {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <Navbar slug={slug} />
      <div className="flex-1">
        <div className="max-w-screen-xl mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default layout;
