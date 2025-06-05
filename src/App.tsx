import { useState } from "react";
import type { Candidate } from "./types/types";
import { Plus, User } from "lucide-react";
import CandidateTable from "./components/candidate/candidate-table";
import CandidateCard from "./components/candidate/candidate-card";
import SidePanel from "./components/sidepanel";
import { initialCandidates } from "./data/data";

const App: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | undefined>();
  const [panelMode, setPanelMode] = useState<'add' | 'edit'>('add');

  const handleAddCandidate = () => {
    setEditingCandidate(undefined);
    setPanelMode('add');
    setIsPanelOpen(true);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setPanelMode('edit');
    setIsPanelOpen(true);
  };

  const handleDeleteCandidate = (id: number) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      setCandidates(prev => prev.filter(candidate => candidate.id !== id));
    }
  };

  const handleSaveCandidate = (candidateData: Omit<Candidate, 'id'>) => {
    if (panelMode === 'add') {
      const newId = Math.max(...candidates.map(c => c.id), 0) + 1;
      setCandidates(prev => [...prev, { ...candidateData, id: newId }]);
    } else if (editingCandidate) {
      setCandidates(prev =>
        prev.map(candidate =>
          candidate.id === editingCandidate.id
            ? { ...candidateData, id: editingCandidate.id }
            : candidate
        )
      );
    }
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setEditingCandidate(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Candidate Management</h1>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">View:</span>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Cards
              </button>
            </div>
            
            <button
              onClick={handleAddCandidate}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Candidate
            </button>
          </div>
        </div>

        {/* Content */}
        {candidates.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first candidate.</p>
            <button
              onClick={handleAddCandidate}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Candidate
            </button>
          </div>
        ) : viewMode === 'table' ? (
          <CandidateTable
            candidates={candidates}
            onEdit={handleEditCandidate}
            onDelete={handleDeleteCandidate}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onEdit={handleEditCandidate}
              />
            ))}
          </div>
        )}

        {/* Side Panel */}
        <SidePanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          onSave={handleSaveCandidate}
          candidate={editingCandidate}
          mode={panelMode}
        />
      </div>
    </div>
  );
};

export default App;