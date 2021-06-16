<template>
  <AppContainer class="h-screen">
    <div class="h-full text-center text-lg flex flex-col mt-6">
      <div class="mb-8">
        <div class="grid gap-2 mb-8">
          <div>Besoin <span class="font-bold">d'aide</span> ?</div>
          <div>Une <span class="font-bold">suggestion</span> ?</div>
          <div>Un <span class="font-bold">bogue</span> trouvé ?</div>
          <div>Un <span class="font-bold">mot</span> gentil ?</div>
        </div>
        <div class="flex flex-row justify-center">
          <InsameeAppButton>Nous contacter</InsameeAppButton>
        </div>
      </div>
      <div>
        <GraphicMail class="w-full" />
      </div>
    </div>
  </AppContainer>
</template>
