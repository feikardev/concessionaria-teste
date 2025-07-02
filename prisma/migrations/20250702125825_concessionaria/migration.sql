-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_marcaId_fkey";

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE CASCADE ON UPDATE CASCADE;
