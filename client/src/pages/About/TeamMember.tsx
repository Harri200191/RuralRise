import React from 'react';
import type { TeamMemberType } from '../../types';

interface TeamMemberProps {
  member: TeamMemberType;
}

export function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="text-center">
      <img
        src={member.image}
        alt={member.name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-emerald-600">{member.role}</p>
      <p className="text-gray-600 mt-2">{member.description}</p>
    </div>
  );
}