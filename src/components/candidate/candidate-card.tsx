import { Briefcase, Code, Edit2, Mail, Phone } from "lucide-react";
import type { Candidate } from "../../types/types";


const CandidateCard: React.FC<{
  candidate: Candidate;
  onEdit: (candidate: Candidate) => void;
}> = ({ candidate, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
        <button
          onClick={() => onEdit(candidate)}
          className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          {candidate.email}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2 text-gray-400" />
          {candidate.phone}
        </div>
        
        <div className="flex items-start text-sm text-gray-600">
          <Code className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
          <span>{candidate.skills}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
          {candidate.experience} years experience
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;