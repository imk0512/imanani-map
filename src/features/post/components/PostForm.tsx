import { useState } from 'react';

export type PostInput = {
  preset: string;
  message?: string;
};

type PostFormProps = {
  onSubmit: (post: PostInput) => void;
};

const presets = [
  '🛋️ だらけ中',
  '☕ カフェ中',
  '🚶‍♀️ 散歩中',
  '🎮 ゲーム中',
  '🛏️ 寝ようとしてる',
  '📖 読書中',
  '📚 勉強中',
  '🧘‍♀️ 瞑想中',
  '✍️ 仕事中',
];

export default function PostForm({ onSubmit }: PostFormProps) {
  const [preset, setPreset] = useState(presets[0]);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ preset, message: message ? message : undefined });
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm mx-auto">
      <div className="grid grid-cols-3 gap-2">
        {presets.map((p) => (
          <button
            type="button"
            key={p}
            onClick={() => setPreset(p)}
            className={`p-2 border rounded text-sm ${preset === p ? 'bg-blue-500 text-white' : 'bg-white'} focus:outline-none`}
          >
            {p}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={15}
        placeholder="どんな感じ？"
        className="border rounded p-2 text-sm"
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2 text-sm">
        投稿する
      </button>
    </form>
  );
}
