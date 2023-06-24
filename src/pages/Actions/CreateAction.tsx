import useALICE from '../../contexts/ALICE/useALICE.ts';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import { useMemo } from 'react';
import { weiToEther } from '../../utils/web3.ts';
import { FadeIn } from '../../animations';
import AmountInput from '../../components/Common/AmountInput.tsx';

export const RenderCreateBody = () => {
  const { balance } = useALICE();
  const {
    createAmount,
    handleCreateAmountChange,
    handleCreateBonALICEClicked,
    createActionLoading,
  } = useCreateAction();

  const isCreateBondedALICEButtonDisabled = useMemo(() => {
    return (
      !createAmount ||
      !balance ||
      Number(weiToEther(balance.toString())) < Number(createAmount) ||
      createActionLoading
    );
  }, [balance, createAmount, createActionLoading]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput
          balance={
            typeof balance === 'bigint' ? weiToEther(balance.toString()) : '...'
          }
          value={createAmount}
          onValueChanged={handleCreateAmountChange}
        />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <p className="max-md:text-sm font-light text-gray10 underline mb-8 md:mb-10 cursor-pointer">
          I Want to Boost Bonded ALICE Power with LP Tokens
        </p>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
          <p className="font-light">Your bonALICE power will be</p>
          <p className="font-medium">{createAmount ? createAmount : 0}</p>
        </span>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between text-gray10 max-md:text-sm">
          <p className="font-light">Your tier will be</p>
          <p className="font-medium">ALICE Supreme (Tier 3)</p>
        </span>
      </FadeIn>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
      >
        <button
          onClick={() => handleCreateBonALICEClicked()}
          className="btn btn--secondary !w-full"
          disabled={isCreateBondedALICEButtonDisabled}
        >
          Create Bonded ALICE
        </button>
      </FadeIn>
    </>
  );
};
