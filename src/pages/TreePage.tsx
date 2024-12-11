import { useParams, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import { trees } from '../data/trees';
import TreeDetails from '../components/tree/TreeDetails';

function TreePage() {
  const { treeId } = useParams();
  const tree = trees.find(t => t.id === treeId);

  if (!tree) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Header />
      <div className="max-w-3xl mx-auto">
        <img
          src={tree.images.main}
          alt={tree.title}
          className="w-full h-64 object-cover mb-8 rounded-lg"
        />
        <TreeDetails tree={tree} />
      </div>
    </Layout>
  );
}

export default TreePage;