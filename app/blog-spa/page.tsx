'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ExternalItem } from '@/lib/external';

function BlogSpaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSource = searchParams.get('source') === 'news' ? 'news' : 'products';
  const initialSearch = searchParams.get('search') || '';
  const initialId = searchParams.get('id') || null;

  const [items, setItems] = useState<ExternalItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [source, setSource] = useState<'products' | 'news'>(initialSource);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedId, setSelectedId] = useState<string | null>(initialId);

  const updateUrl = (newSource: string, newSearch: string, newId: string | null) => {
    const params = new URLSearchParams();
    params.set('source', newSource);
    if (newSearch) params.set('search', newSearch);
    if (newId) params.set('id', newId);
    router.replace(`/blog-spa?${params.toString()}`);
  };

  function selectSource(s: 'products' | 'news') {
    setSource(s);
    setSelectedId(null);
    updateUrl(s, searchQuery, null);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setSearchQuery(query);
    updateUrl(source, query, selectedId);
  }

  function handleOpenModal(id: string) {
    setSelectedId(id);
    updateUrl(source, searchQuery, id);
  }

  function handleCloseModal() {
    setSelectedId(null);
    updateUrl(source, searchQuery, null);
  }

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch(`/api/aggregate?source=${source}`)
      .then((r) => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then((data: { external: ExternalItem[] }) => {
        setItems(data.external || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
        setItems([]);
      });
  }, [source]);

  const filteredItems = items.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
    const subtitleMatch = item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
    return titleMatch || subtitleMatch;
  });

  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <main className="p-8 max-w-4xl mx-auto relative">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        🧩 Blog Aggregator (SPA)
      </h1>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => selectSource('products')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              source === 'products' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => selectSource('news')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              source === 'news' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            News
          </button>
        </div>

        <input
          type="text"
          placeholder="ค้นหาข้อมูลทันที..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
        />
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-blue-600 animate-pulse font-medium">
          ⏳ กำลังซิงค์ข้อมูลล่าสุด กรุณารอสักครู่...
        </div>
      ) : isError ? (
        <div className="py-12 text-center bg-red-50 border border-red-200 rounded-lg text-red-600">
          ⚠️ เกิดข้อผิดพลาดในการโหลดข้อมูลจากแหล่งภายนอก (Source อาจไม่ถูกต้องหรือระบบขัดข้อง)
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-12 text-center bg-gray-50 border rounded-lg text-gray-500">
          📭 ไม่พบรายการที่ตรงกับคำค้นหา &quot;{searchQuery}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(item.id)}
              className="p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <h2 className="font-bold text-blue-800">{item.title}</h2>
              <p className="text-gray-500 text-sm mt-1">{item.subtitle}</p>
              <span className="inline-block mt-3 text-xs text-blue-600 font-semibold">คลิกเพื่อดูรายละเอียด →</span>
            </div>
          ))}
        </div>
      )}

      {selectedId && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95">
            <h2 className="text-xl font-bold text-blue-900 mb-2">{selectedItem.title}</h2>
            <p className="text-gray-700 text-sm mb-4">{selectedItem.subtitle}</p>
            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 mb-6">
              <p><strong>ID:</strong> {selectedItem.id}</p>
              <p className="mt-1">รายละเอียดเพิ่มเติมจำลองสำหรับการแสดงผลแบบ Modal โดยไม่มีการโหลดหน้าใหม่</p>
            </div>
            <button
              onClick={handleCloseModal}
              className="w-full bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function BlogSpaPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-blue-600">Loading...</div>}>
      <BlogSpaContent />
    </Suspense>
  );
}