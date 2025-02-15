export default async function Page() {
    const data = await fetch('https://api.vercel.app/blog');
    const posts = await data.json();
    return (
        <div className="grid grid-rows-[20px_1fr_20px] justify-start min-h-full p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-wrap gap-8 justify-center">
                <div className="w-full sm:w-auto">
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>{post.title}</li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}