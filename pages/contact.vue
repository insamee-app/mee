<template>
  <section class="h-screen w-full">
    <div class="h-full text-center text-lg flex flex-col justify-between">
      <div>
        <div class="grid gap-2 mb-8">
          <div>Besoin <span class="font-bold">d'aide</span> ?</div>
          <div>Une <span class="font-bold">suggestion</span> ?</div>
          <div>Un <span class="font-bold">bogue</span> trouvé ?</div>
          <div>Un <span class="font-bold">mot</span> gentil ?</div>
        </div>
        <div>
          <AppButton>Nous contacter</AppButton>
        </div>
      </div>
      <div>
        <GraphicMail class="w-full" />
      </div>
    </div>
  </section>
</template>
