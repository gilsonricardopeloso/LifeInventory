import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const mockUsers = [
  {
    id: 1,
    name: "Alice Silva",
    email: "alice@email.com",
    active: true,
    session: "2h 15m",
    ip: "192.168.0.2",
    habits: 7,
    achievements: 3,
  },
  {
    id: 2,
    name: "Bruno Souza",
    email: "bruno@email.com",
    active: true,
    session: "1h 05m",
    ip: "192.168.0.3",
    habits: 4,
    achievements: 1,
  },
  {
    id: 3,
    name: "Carla Lima",
    email: "carla@email.com",
    active: false,
    session: "-",
    ip: "192.168.0.4",
    habits: 2,
    achievements: 0,
  },
  {
    id: 4,
    name: "Daniel Costa",
    email: "daniel@email.com",
    active: true,
    session: "3h 40m",
    ip: "192.168.0.5",
    habits: 10,
    achievements: 5,
  },
  {
    id: 5,
    name: "Eduarda Rocha",
    email: "eduarda@email.com",
    active: false,
    session: "-",
    ip: "192.168.0.6",
    habits: 1,
    achievements: 0,
  },
  {
    id: 6,
    name: "Felipe Alves",
    email: "felipe@email.com",
    active: true,
    session: "0h 50m",
    ip: "192.168.0.7",
    habits: 3,
    achievements: 2,
  },
  {
    id: 7,
    name: "Gabriela Dias",
    email: "gabriela@email.com",
    active: true,
    session: "4h 10m",
    ip: "192.168.0.8",
    habits: 8,
    achievements: 4,
  },
  {
    id: 8,
    name: "Henrique Melo",
    email: "henrique@email.com",
    active: false,
    session: "-",
    ip: "192.168.0.9",
    habits: 0,
    achievements: 0,
  },
  {
    id: 9,
    name: "Isabela Pinto",
    email: "isabela@email.com",
    active: true,
    session: "2h 00m",
    ip: "192.168.0.10",
    habits: 5,
    achievements: 2,
  },
  {
    id: 10,
    name: "João Pedro",
    email: "joao@email.com",
    active: true,
    session: "1h 30m",
    ip: "192.168.0.11",
    habits: 6,
    achievements: 1,
  },
  {
    id: 11,
    name: "Karen Martins",
    email: "karen@email.com",
    active: false,
    session: "-",
    ip: "192.168.0.12",
    habits: 1,
    achievements: 0,
  },
  {
    id: 12,
    name: "Lucas Ferreira",
    email: "lucas@email.com",
    active: true,
    session: "0h 20m",
    ip: "192.168.0.13",
    habits: 2,
    achievements: 1,
  },
  {
    id: 13,
    name: "Marina Teixeira",
    email: "marina@email.com",
    active: true,
    session: "3h 05m",
    ip: "192.168.0.14",
    habits: 9,
    achievements: 5,
  },
  {
    id: 14,
    name: "Nicolas Ramos",
    email: "nicolas@email.com",
    active: false,
    session: "-",
    ip: "192.168.0.15",
    habits: 0,
    achievements: 0,
  },
  {
    id: 15,
    name: "Otávio Borges",
    email: "otavio@email.com",
    active: true,
    session: "1h 10m",
    ip: "192.168.0.16",
    habits: 4,
    achievements: 2,
  },
  {
    id: 16,
    name: "Patrícia Souza",
    email: "patricia@email.com",
    active: false,
    session: "-",
    ip: "192.168.0.17",
    habits: 1,
    achievements: 0,
  },
  {
    id: 17,
    name: "Quésia Lopes",
    email: "quesia@email.com",
    active: true,
    session: "2h 45m",
    ip: "192.168.0.18",
    habits: 7,
    achievements: 3,
  },
  {
    id: 18,
    name: "Rafael Duarte",
    email: "rafael@email.com",
    active: true,
    session: "0h 55m",
    ip: "192.168.0.19",
    habits: 3,
    achievements: 1,
  },
  {
    id: 19,
    name: "Sabrina Castro",
    email: "sabrina@email.com",
    active: false,
    session: "-",
    ip: "192.168.0.20",
    habits: 0,
    achievements: 0,
  },
  {
    id: 20,
    name: "Thiago Nunes",
    email: "thiago@email.com",
    active: true,
    session: "3h 20m",
    ip: "192.168.0.21",
    habits: 8,
    achievements: 4,
  },
  {
    id: 21,
    name: "Ursula Farias",
    email: "ursula@email.com",
    active: true,
    session: "1h 25m",
    ip: "192.168.0.22",
    habits: 5,
    achievements: 2,
  },
  {
    id: 22,
    name: "Vinícius Prado",
    email: "vinicius@email.com",
    active: false,
    session: "-",
    ip: "192.168.0.23",
    habits: 1,
    achievements: 0,
  },
  {
    id: 23,
    name: "Wesley Gomes",
    email: "wesley@email.com",
    active: true,
    session: "2h 05m",
    ip: "192.168.0.24",
    habits: 6,
    achievements: 3,
  },
  {
    id: 24,
    name: "Xuxa Meneghel",
    email: "xuxa@email.com",
    active: true,
    session: "0h 40m",
    ip: "192.168.0.25",
    habits: 2,
    achievements: 1,
  },
  {
    id: 25,
    name: "Yasmin Oliveira",
    email: "yasmin@email.com",
    active: false,
    session: "-",
    ip: "192.168.0.26",
    habits: 0,
    achievements: 0,
  },
  {
    id: 26,
    name: "Zeca Pagodinho",
    email: "zeca@email.com",
    active: true,
    session: "4h 00m",
    ip: "192.168.0.27",
    habits: 10,
    achievements: 5,
  },
]

const USERS_PER_PAGE = 10

const sortOptions = [
  { value: "name-asc", label: "Nome (A-Z)" },
  { value: "name-desc", label: "Nome (Z-A)" },
  { value: "ip-asc", label: "IP (A-Z)" },
  { value: "ip-desc", label: "IP (Z-A)" },
  { value: "habits-asc", label: "Hábitos (Crescente)" },
  { value: "habits-desc", label: "Hábitos (Decrescente)" },
  { value: "achievements-asc", label: "Conquistas (Crescente)" },
  { value: "achievements-desc", label: "Conquistas (Decrescente)" },
  { value: "session-asc", label: "Tempo de Uso (Crescente)" },
  { value: "session-desc", label: "Tempo de Uso (Decrescente)" },
]

function parseSession(session) {
  if (!session || session === "-") return 0
  const [h, m] = session.split("h ")
  return parseInt(h) * 60 + parseInt(m)
}

export default function Users() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("name-asc")
  const totalPages = Math.ceil(mockUsers.length / USERS_PER_PAGE)

  // Filtro de busca
  let filtered = mockUsers.filter((user) => {
    const q = search.toLowerCase()
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.email.split("@")[1]?.toLowerCase().includes(q) ||
      user.ip.toLowerCase().includes(q) ||
      String(user.habits).includes(q) ||
      String(user.achievements).includes(q)
    )
  })

  // Ordenação
  filtered = filtered.sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "ip-asc":
        return a.ip.localeCompare(b.ip)
      case "ip-desc":
        return b.ip.localeCompare(a.ip)
      case "habits-asc":
        return a.habits - b.habits
      case "habits-desc":
        return b.habits - a.habits
      case "achievements-asc":
        return a.achievements - b.achievements
      case "achievements-desc":
        return b.achievements - a.achievements
      case "session-asc":
        return parseSession(a.session) - parseSession(b.session)
      case "session-desc":
        return parseSession(b.session) - parseSession(a.session)
      default:
        return 0
    }
  })

  const paginated = filtered.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  )
  const totalFilteredPages = Math.ceil(filtered.length / USERS_PER_PAGE)

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Usuários do Sistema ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4 items-stretch md:items-center">
            <Input
              placeholder="Buscar por nome, IP, hábitos ou conquistas..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full md:w-1/2"
            />
            <select
              className="border rounded px-2 py-1 text-sm md:w-1/2"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-xs md:text-sm">ID</TableHead>
                  <TableHead className="min-w-[160px] text-xs md:text-sm">
                    Email
                  </TableHead>
                  <TableHead className="min-w-[120px] text-xs md:text-sm">
                    Nome
                  </TableHead>
                  <TableHead className="text-xs md:text-sm">Status</TableHead>
                  <TableHead className="text-xs md:text-sm">
                    Tempo de Uso
                  </TableHead>
                  <TableHead className="text-xs md:text-sm">IP</TableHead>
                  <TableHead className="text-xs md:text-sm">Hábitos</TableHead>
                  <TableHead className="text-xs md:text-sm">
                    Conquistas
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-xs md:text-sm">
                      {user.id}
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {user.active ? (
                        <span className="text-green-600 font-semibold">
                          Ativo
                        </span>
                      ) : (
                        <span className="text-gray-400">Inativo</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {user.session}
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {user.ip}
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {user.habits}
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {user.achievements}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Anterior
            </Button>
            <span>
              Página {page} de {totalFilteredPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalFilteredPages}
              onClick={() =>
                setPage((p) => Math.min(totalFilteredPages, p + 1))
              }
            >
              Próxima
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
