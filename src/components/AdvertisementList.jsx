/* eslint-disable react/prop-types */
import Advertisement from "./Advertisement";

export default function AdvertisementList({ advertisement }) {
  return (
    <div>
      <ul className="grid w-full grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {advertisement.map((item) => (
          <Advertisement key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
