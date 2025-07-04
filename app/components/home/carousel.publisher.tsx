import Image from "next/image";

const SponsorBanner = () => {
      const sponsors = [1, 2, 3, 4, 5];

      return (
            <div className="flex flex-col space-y-16 pt-24 pb-10">
                  <label className="text-center text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">Các Nhà Xuất Bản cùng đồng hành</label>
                  <div className="overflow-hidden shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1),0_-4px_4px_-2px_rgba(0,0,0,0.1)] py-6">
                        <div className="flex animate-marquee space-x-20">
                              {[...sponsors, ...sponsors].map((id, i) => (
                                    <Image
                                          key={i}
                                          src={`/assets/sponsor${id}.png`}
                                          alt={`Sponsor ${id}`}
                                          width={100}
                                          height={40}
                                          className="h-12 w-auto"
                                    />
                              ))}
                        </div>
                  </div>
            </div>
      );
}
export default SponsorBanner;