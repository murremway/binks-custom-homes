import React, { useState, useRef } from 'react';
import './FloorPlanViewer.css';

const FloorPlanViewer = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [zoom, setZoom] = useState(1);
  const svgRef = useRef(null);

  // Data extracted from Ridgeview Custom Home Permit (Sheet A3-1 & A6-2.1)
  const rooms = [
    { id: 'garage', name: '2-Car Garage', sqft: 564, dims: '23\'-0" x 23\'-0"', type: 'Concrete', path: 'M 50 350 L 250 350 L 250 550 L 50 550 Z' },
    { id: 'porch', name: 'Front Porch', sqft: 54, dims: '7\'-0" x 7\'-6"', type: 'Composite', path: 'M 250 450 L 320 450 L 320 520 L 250 520 Z' },
    { id: 'foyer', name: 'Foyer', sqft: 65, dims: '8\'-0" x 8\'-0"', type: 'L.V.P.', path: 'M 320 450 L 400 450 L 400 530 L 320 530 Z' },
    { id: 'office', name: 'Office', sqft: 120, dims: '12\'-6" x 9\'-4"', type: 'L.V.P.', path: 'M 320 350 L 440 350 L 440 450 L 320 450 Z' },
    { id: 'dining', name: 'Dining Room', sqft: 160, dims: '13\'-6" x 12\'-6"', type: 'L.V.P.', path: 'M 400 450 L 530 450 L 530 580 L 400 580 Z' },
    { id: 'kitchen', name: 'Kitchen', sqft: 165, dims: '13\'-5" x 12\'-6"', type: 'L.V.P.', path: 'M 530 450 L 660 450 L 660 580 L 530 580 Z' },
    { id: 'pantry', name: 'Pantry', sqft: 30, dims: '5\'-0" x 6\'-0"', type: 'L.V.P.', path: 'M 660 450 L 690 450 L 690 510 L 660 510 Z' },
    { id: 'great-room', name: 'Great Room', sqft: 240, dims: '18\'-0" x 13\'-6"', type: 'L.V.P.', path: 'M 400 580 L 580 580 L 580 720 L 400 720 Z' },
    { id: 'mud', name: 'Mud Room', sqft: 50, dims: '6\'-0" x 8\'-0"', type: 'L.V.P.', path: 'M 660 510 L 710 510 L 710 590 L 660 590 Z' },
    { id: 'laundry', name: 'Laundry', sqft: 45, dims: '6\'-0" x 7\'-6"', type: 'C-Tile', path: 'M 660 590 L 710 590 L 710 660 L 660 660 Z' },
    { id: 'pdr', name: 'Powder Room', sqft: 35, dims: '5\'-0" x 7\'-0"', type: 'C-Tile', path: 'M 600 580 L 660 580 L 660 650 L 600 650 Z' },
    { id: 'hall-main', name: 'Main Hall', sqft: 80, dims: 'Varied', type: 'L.V.P.', path: 'M 580 580 L 660 580 L 660 720 L 580 720 Z' },
    { id: 'bed2', name: 'Bedroom 2', sqft: 140, dims: '12\'-2" x 11\'-5"', type: 'Carpet', path: 'M 400 720 L 540 720 L 540 860 L 400 860 Z' },
    { id: 'bed3', name: 'Bedroom 3', sqft: 140, dims: '12\'-2" x 11\'-5"', type: 'Carpet', path: 'M 540 720 L 680 720 L 680 860 L 540 860 Z' },
    { id: 'bath-hall', name: 'Hall Bath', sqft: 67, dims: '8\'-0" x 8\'-5"', type: 'C-Tile', path: 'M 680 720 L 760 720 L 760 800 L 680 800 Z' },
    { id: 'owner-bed', name: 'Owner\'s Bedroom', sqft: 220, dims: '13\'-0" x 16\'-6"', type: 'Carpet', path: 'M 400 860 L 560 860 L 560 1020 L 400 1020 Z' },
    { id: 'wic', name: 'W.I.C.', sqft: 80, dims: '8\'-0" x 10\'-0"', type: 'Carpet', path: 'M 560 860 L 660 860 L 660 960 L 560 960 Z' },
    { id: 'owner-bath', name: 'Owner\'s Bath', sqft: 148, dims: '13\'-5" x 11\'-0"', type: 'C-Tile', path: 'M 560 960 L 660 960 L 660 1020 L 560 1020 L 560 1090 L 400 1090 L 400 1020 Z' },
  ];

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setSelectedRoom(null);
  };

  return (
    <div className="floor-plan-container">
      <div className="plan-controls">
        <h3>Ridgeview Model - First Floor</h3>
        <div className="zoom-controls">
          <button onClick={handleZoomOut}>-</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn}>+</button>
          <button className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className="plan-wrapper">
        <svg 
          ref={svgRef}
          viewBox="0 0 800 1100" 
          style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e0e0e0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Rooms */}
          {rooms.map((room) => (
            <g key={room.id} onClick={() => handleRoomClick(room)} className="room-group">
              <path 
                d={room.path} 
                className={`room-shape ${selectedRoom?.id === room.id ? 'active' : ''}`}
                fill={selectedRoom?.id === room.id ? '#3498db' : '#f8f9fa'}
                stroke="#2c3e50"
                strokeWidth="2"
              />
              <text 
                x={room.path.split(' ')[1]} 
                y={room.path.split(' ')[2]} 
                dx="10" dy="20"
                className="room-label"
              >
                {room.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {selectedRoom && (
        <div className="room-details-panel">
          <h4>{selectedRoom.name}</h4>
          <div className="detail-row">
            <span>Dimensions:</span>
            <strong>{selectedRoom.dims}</strong>
          </div>
          <div className="detail-row">
            <span>Square Footage:</span>
            <strong>{selectedRoom.sqft} SF</strong>
          </div>
          <div className="detail-row">
            <span>Finish:</span>
            <strong>{selectedRoom.type}</strong>
          </div>
        </div>
      )}

      <div className="plan-legend">
        <h4>Finish Legend</h4>
        <ul>
          <li><span className="dot lvp"></span> L.V.P. Flooring</li>
          <li><span className="dot carpet"></span> Carpet w/ Pad</li>
          <li><span className="dot tile"></span> Ceramic Tile</li>
        </ul>
      </div>
    </div>
  );
};

export default FloorPlanViewer;