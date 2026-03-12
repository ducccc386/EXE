export default function News() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Tin tức</h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-xl font-semibold">
            Cách học Toán hiệu quả
          </h3>
          <p className="text-gray-600">
            Gia sư chia sẻ phương pháp học toán tốt nhất.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-xl font-semibold">
            5 mẹo học tiếng Anh nhanh
          </h3>
          <p className="text-gray-600">
            Những phương pháp giúp bạn cải thiện kỹ năng.
          </p>
        </div>

      </div>
    </div>
  );
}