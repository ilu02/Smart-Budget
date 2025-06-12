import Sidebar from './Sidebar';

function MainLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '200px', padding: '2rem', flex: 1 }}>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
