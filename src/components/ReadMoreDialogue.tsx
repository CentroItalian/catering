import React from 'react'

interface ReadMoreDialogueProps {
  item_name: string;
  description: string;
  setOrder: React.Dispatch<React.SetStateAction<{ [key: string]: { quantity: number; instructions: string; }; }>>;
  order: {
    [key: string]: {
      quantity: number;
      instructions: string;
    };
  };
  handleQuantityChange: (itemName: string, increment: boolean) => void;
  item: {
    category: string;
    name: string;
    description: string;
    serves: string;
  };
  handleInstructionChange: (itemName: string, instructions: string) => void;
}

const ReadMoreDialogue: React.FC<ReadMoreDialogueProps> = ({ item_name, description, order, handleQuantityChange, item, handleInstructionChange }) => {
  return (
    <dialog id={`read_more_dialogue_${item_name}`} className="modal modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="modal-content">
          <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
          <p>{description}</p>
          <p className="text-gray-500">{item.serves}</p>

          <div className="flex items-center mt-2">
            <button
              className="bg-gray-300 px-2 rounded-lg"
              onClick={() => handleQuantityChange(item.name, false)}
            >
              -
            </button>
            <span className="px-4">{order[item.name]?.quantity || 0}</span>
            <button
              className="bg-gray-300 px-2 rounded-lg"
              onClick={() => handleQuantityChange(item.name, true)}
            >
              +
            </button>
          </div>

          <textarea
            className="mt-2 w-full p-2 border rounded-lg resize-none"
            placeholder="Special instructions"
            value={order[item.name]?.instructions || ''}
            onChange={(e) => handleInstructionChange(item.name, e.target.value)}
          />
        </div>

        <form method="dialog">
          <div className='flex justify-center items-center'>
            <button className="btn text-white btn-success mt-4">Continue Ordering</button>
          </div>
        </form>

      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default ReadMoreDialogue