import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  onClick?: () => void;
};

export const PagesHeader = ({ title, onClick }: Props) => {
  const router = useRouter();
  return (
    <>
      <div className="relative">
        <div className="absolute cursor-pointer arrow-position" onClick={onClick ? onClick : () => router.back()}>
          <Image src="/icons/arrow-back.svg" width={15} height={15} />
        </div>
        <div className="w-full h-10 mb-4 text-center border box-border border-solid">
          <div className="py-2">{title}</div>
        </div>
      </div>
      <style jsx>{`
        .arrow-position {
          top: 23%;
          left: 4%;
        }
      `}</style>
    </>
  );
};
