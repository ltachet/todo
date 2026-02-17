import TodoApp from "@/components/TodoApp";

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <h1>Todo Visualizer</h1>
        <p>Track tasks, monitor progress, and keep your work in view.</p>
      </section>
      <TodoApp />
    </main>
  );
}
