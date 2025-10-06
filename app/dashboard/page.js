'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCurrentUser } from '@/lib/auth';
import { getPosts, createPost } from '@/lib/api';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();
  const dashboardRef = useRef(null);

  const categories = ['all', 'textbooks', 'electronics', 'furniture', 'clothing', 'services', 'other'];

  useEffect(() => {
    async function init() {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      await loadPosts();
      setLoading(false);
    }
    init();
  }, [router]);

  useEffect(() => {
    if (dashboardRef.current && !loading) {
      gsap.fromTo(
        '.dashboard-header',
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.dashboard-filters',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        '.post-card',
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: 'back.out(1.7)',
          delay: 0.4
        }
      );
    }
  }, [loading, filteredPosts]);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, selectedCategory]);

  const loadPosts = async () => {
    try {
      const response = await getPosts({ limit: 100 });
      setPosts(response.posts || []);
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.content?.toLowerCase().includes(`category:${selectedCategory}`)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div ref={dashboardRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="dashboard-header mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-5xl font-bold text-white mb-2">
                  Welcome back, <span className="text-[#CC0633]">{user?.username}</span>!
                </h1>
                <p className="text-gray-400 text-lg">Discover amazing deals from fellow SFU students</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-[#CC0633] hover:bg-[#A6192E] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Listing
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-[#CC0633] to-[#A6192E] rounded-2xl p-6">
                <div className="text-white/80 text-sm mb-2">Total Listings</div>
                <div className="text-white text-4xl font-bold">{posts.length}</div>
              </div>
              <div className="bg-gradient-to-br from-[#54585A] to-black rounded-2xl p-6 border border-white/10">
                <div className="text-white/80 text-sm mb-2">My Listings</div>
                <div className="text-white text-4xl font-bold">
                  {posts.filter(p => p.user_id === user?.user_id).length}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#54585A] to-black rounded-2xl p-6 border border-white/10">
                <div className="text-white/80 text-sm mb-2">Categories</div>
                <div className="text-white text-4xl font-bold">{categories.length - 1}</div>
              </div>
              <div className="bg-gradient-to-br from-[#54585A] to-black rounded-2xl p-6 border border-white/10">
                <div className="text-white/80 text-sm mb-2">New Today</div>
                <div className="text-white text-4xl font-bold">
                  {posts.filter(p => {
                    const today = new Date().toDateString();
                    return new Date(p.created_at).toDateString() === today;
                  }).length}
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-filters mb-8">
            <div className="bg-gradient-to-br from-[#54585A]/30 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search listings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#CC0633] transition-colors duration-300 pr-12"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium capitalize transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[#CC0633] text-white'
                        : 'bg-black/50 text-gray-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="text-gray-400 text-xl mb-4">No listings found</div>
                <p className="text-gray-500">Try adjusting your filters or create a new listing</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                  currentUser={user}
                  onEdit={(post) => {
                    setSelectedPost(post);
                    setShowEditModal(true);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateListingModal
          user={user}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadPosts();
          }}
        />
      )}

      {showEditModal && selectedPost && (
        <EditListingModal
          post={selectedPost}
          onClose={() => {
            setShowEditModal(false);
            setSelectedPost(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            setSelectedPost(null);
            loadPosts();
          }}
        />
      )}

      <Footer />
    </div>
  );
}

function PostCard({ post, currentUser, onEdit }) {
  const isOwner = post.user_id === currentUser?.user_id;
  const cardRef = useRef(null);

  const handleBuy = () => {
    alert(`Contact the seller to purchase: ${post.title}`);
  };

  return (
    <div ref={cardRef} className="post-card bg-gradient-to-br from-[#54585A]/30 to-black/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-[#CC0633]/50 transition-all duration-300 group">
      <div className="h-48 bg-gradient-to-br from-[#CC0633]/20 to-[#A6192E]/20 flex items-center justify-center">
        <svg className="w-16 h-16 text-[#CC0633]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#CC0633] transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {post.content.split('category:')[0].trim()}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
          <span>ID: {post.user_id}</span>
        </div>

        {isOwner ? (
          <button
            onClick={() => onEdit(post)}
            className="w-full bg-[#54585A] hover:bg-[#CC0633] text-white py-3 rounded-xl font-medium transition-all duration-300"
          >
            Edit Listing
          </button>
        ) : (
          <button
            onClick={handleBuy}
            className="w-full bg-[#CC0633] hover:bg-[#A6192E] text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
          >
            Contact Seller
          </button>
        )}
      </div>
    </div>
  );
}

function CreateListingModal({ user, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.title || !formData.description) {
        throw new Error('Please fill in all fields');
      }

      const content = `${formData.description} category:${formData.category}`;
      await createPost(user.user_id, formData.title, content);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-gradient-to-br from-[#54585A]/50 to-black/90 backdrop-blur-xl rounded-3xl border border-white/10 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Create New Listing</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#CC0633] transition-colors duration-300"
              placeholder="e.g., Physics Textbook - 12th Edition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CC0633] transition-colors duration-300"
            >
              <option value="textbooks">Textbooks</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="services">Services</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#CC0633] transition-colors duration-300 resize-none"
              placeholder="Describe your item in detail..."
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#54585A] hover:bg-[#54585A]/80 text-white py-3 rounded-xl font-medium transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#CC0633] hover:bg-[#A6192E] text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditListingModal({ post, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: post.title,
    description: post.content.split('category:')[0].trim(),
    category: post.content.includes('category:') ? post.content.split('category:')[1].trim() : 'other',
  });
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  const handleUpdate = () => {
    alert('Update functionality would connect to PATCH /api/posts endpoint');
    onSuccess();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this listing?')) {
      alert('Delete functionality would connect to DELETE /api/posts endpoint');
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-gradient-to-br from-[#54585A]/50 to-black/90 backdrop-blur-xl rounded-3xl border border-white/10 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Edit Listing</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#CC0633] transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CC0633] transition-colors duration-300"
            >
              <option value="textbooks">Textbooks</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="services">Services</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#CC0633] transition-colors duration-300 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-all duration-300"
            >
              Delete
            </button>
            <button
              onClick={handleUpdate}
              className="flex-1 bg-[#CC0633] hover:bg-[#A6192E] text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
