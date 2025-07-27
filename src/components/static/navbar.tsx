'use client';
import Link from "next/link";
import { Container } from "../../app/(site)/container";
import LanguageSwitcher from "../LanguageSwitcher";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchAgentByCode, getAgentImageById } from "@/lib/agent";
import { agentImageType } from "@/types/all";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import {useTranslations} from 'next-intl';



export default function Header() {
    const t = useTranslations("nv");
  const params = useParams();
  const [parentid, setParentid] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [agentImage, setAgentImage] = useState<agentImageType>();

  useEffect(() => {
      const parent = typeof params?.child === 'string' && params.child ? params.child : typeof params?.parent === 'string' && params.parent ? params.parent : '1';
      fetchAgentByCode(parent).then(res => {
          if(res.active)
            setParentid(res.id);
          else
            window.location.href = "/insurance";
      }).catch((err)=>{
          window.location.href = "/insurance";
      })
  }, []);

  useEffect(() => {
      setLoaded(false);
      (async ()=>{
        if(parentid && parentid!=1){
            const data = await getAgentImageById(parentid);
            if(data){
                setAgentImage(data);
                setLoaded(true);
            }
        } else if(parentid==1){
            setLoaded(true);
        }
      })()
  }, [parentid]);

  return (
      <header className="px-0 md:px-4 py-3 border-b bg-transparent backdrop-blur-sm z-10">
          <Container className="flex justify-between items-center">
              <div className="flex items-center">
                  {params && (
                      <Link href={`${params.parent ? `/${params.parent}` : "/"}`}>
                          <div className="w-full">
                              {loaded && parentid != 1 && (
                                  <img
                                    src={`data:${agentImage?.mimetype};base64,${agentImage?.data}`}
                                    alt="Banner"
                                    className="w-35 object-cover max-h-9"
                                  />
                              )}
                              {parentid == 1 && (
                                  <img
                                    src="/logotext.png"
                                    alt="Banner"
                                    className="object-cover w-35"
                                  />
                              )}
                              {!loaded && <Skeleton className="w-35 h-9" />}
                          </div>
                      </Link>
                  )}
              </div>

              <div className="flex items-center gap-1 md:gap-3">
                  <LanguageSwitcher type={"list"} />
                  <Link href={"/insurance/track"}>
                      <Button className="rounded-sm bg-transparent border-2 border-[#103c5c] text-[#103c5c] hover:bg-[#103c5c] hover:text-[#efefef] py-4 px-1 text-xs sm:text-sm md:px-4">
                        {t("track")}
                      </Button>
                  </Link>
              </div>
          </Container>

      </header>
  );
}
